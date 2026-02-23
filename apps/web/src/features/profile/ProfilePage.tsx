"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Camera,
  User,
  Mail,
  Zap,
  Briefcase,
  LogOut,
  Trash2,
  Pencil,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@signalvc/ui";
import { useAccount } from "@/shared/contexts/AccountContext";
import { createClient } from "@/shared/supabase/client";
import { getUserName, getUserEmail } from "@/features/auth";
import { AvatarEditor } from "./components/AvatarEditor";

export function ProfilePage() {
  const { user, loading } = useAccount();
  const router = useRouter();
  const supabase = createClient();

  const [avatarEditorOpen, setAvatarEditorOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const displayName = user ? getUserName(user) : "Loading...";
  const displayEmail = user ? getUserEmail(user) : "loading...";
  const currentAvatar = avatarUrl ?? (user?.user_metadata.avatar_url as string | undefined);

  const handleStartEditName = useCallback(() => {
    setNameValue(user ? getUserName(user) : "");
    setEditingName(true);
  }, [user]);

  const handleSaveName = useCallback(async () => {
    if (!user || !nameValue.trim()) return;
    setSavingName(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: nameValue.trim() },
    });
    if (!error) {
      await supabase
        .from("profile")
        .update({ name: nameValue.trim() })
        .eq("id", user.id);
    }
    setSavingName(false);
    setEditingName(false);
  }, [user, nameValue, supabase]);

  const handleAvatarSave = useCallback(
    async (blob: Blob) => {
      if (!user) return;
      const fileName = `${user.id}/avatar-${Date.now()}.png`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, blob, { upsert: true });

      if (uploadError) {
        console.error("Avatar upload failed:", uploadError);
        setAvatarEditorOpen(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      setAvatarUrl(publicUrl);
      setAvatarEditorOpen(false);
    },
    [user, supabase],
  );

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  }, [supabase, router]);

  const handleDeleteAccount = useCallback(async () => {
    // Supabase admin-level delete needs a server action or edge function
    // For now, sign out and show the intent
    await supabase.auth.signOut();
    router.push("/auth");
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Mock stats (will be replaced with real data when API is available)
  const stats = [
    { icon: Zap, label: "Total Swipes", value: "142", accent: "text-primary" },
    { icon: Briefcase, label: "Saved Startups", value: "23", accent: "text-emerald-400" },
  ];

  return (
    <div className="h-full text-foreground">
      <div className="py-8 max-w-lg mx-auto px-4 space-y-6">
        {/* ── Avatar Section ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border shadow-[0_0_25px_rgba(97,95,255,0.3)]">
              {currentAvatar ? (
                <Image
                  src={currentAvatar}
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-avatar-fallback flex items-center justify-center">
                  <User size={40} className="text-faint" />
                </div>
              )}
            </div>
            <button
              onClick={() => setAvatarEditorOpen(true)}
              className="absolute bottom-0 right-0 bg-primary hover:bg-primary/80 transition-colors rounded-full p-2.5 shadow-lg cursor-pointer"
            >
              <Camera size={16} className="text-white" />
            </button>
          </div>
        </motion.div>

        {/* ── User Info ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3"
        >
          {/* Name field */}
          <div className="bg-surface-60 backdrop-blur border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <User size={14} className="text-muted-foreground" />
              <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Name
              </span>
            </div>
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-foreground text-lg font-semibold outline-none border-b border-primary/50 pb-0.5"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void handleSaveName();
                    if (e.key === "Escape") setEditingName(false);
                  }}
                />
                <button
                  onClick={() => void handleSaveName()}
                  disabled={savingName}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => setEditingName(false)}
                  className="text-muted-foreground hover:text-body transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">{displayName}</span>
                <button
                  onClick={handleStartEditName}
                  className="text-muted-foreground hover:text-primary transition-colors p-1"
                >
                  <Pencil size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Email field (readonly) */}
          <div className="bg-surface-60 backdrop-blur border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Mail size={14} className="text-muted-foreground" />
              <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Email
              </span>
            </div>
            <span className="text-lg font-semibold text-body">{displayEmail}</span>
          </div>
        </motion.div>

        {/* ── Stats ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
              className="bg-surface-60 backdrop-blur border border-border rounded-2xl p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <s.icon size={14} className="text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  {s.label}
                </span>
              </div>
              <div className={`text-2xl font-bold ${s.accent}`}>{s.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Actions ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3 pt-2"
        >
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full cursor-pointer justify-center gap-2 h-12 text-body hover:text-foreground border-border hover:border-border"
          >
            <LogOut size={18} />
            Log Out
          </Button>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 text-sm text-faint hover:text-red-400 transition-colors py-3 cursor-pointer"
            >
              <Trash2 size={16} />
              Delete My Account
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-delete-zone border border-delete-zone-border rounded-2xl p-4 space-y-3"
            >
              <p className="text-sm text-red-300">
                Are you sure? This action is irreversible and all your data will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 cursor-pointer border-border"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="flex-1 cursor-pointer"
                >
                  Delete Forever
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── Avatar Editor Modal ─────────────────────────────────── */}
      <AvatarEditor
        open={avatarEditorOpen}
        onClose={() => setAvatarEditorOpen(false)}
        onSave={handleAvatarSave}
      />
    </div>
  );
}
