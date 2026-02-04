import * as SQLite from "expo-sqlite";
import { useState } from "react";
import {
	Alert,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INDUSTRIES = [
	"Fintech",
	"Healthcare",
	"E-commerce",
	"EdTech",
	"AI/ML",
	"SaaS",
	"Cybersecurity",
	"CleanTech",
];

const REGIONS = [
	{ label: "Select a region", value: "" },
	{ label: "United States", value: "US" },
	{ label: "European Union", value: "EU" },
	{ label: "India", value: "IN" },
	{ label: "Japan", value: "JP" },
	{ label: "China", value: "CN" },
	{ label: "Romania", value: "RO" },
];

export default function HomeScreen() {
	const [name, setName] = useState("");
	const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
	const [region, setRegion] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleIndustry = (industry: string) => {
		setSelectedIndustries((prev) =>
			prev.includes(industry)
				? prev.filter((i) => i !== industry)
				: [...prev, industry],
		);
	};

	const handleSave = async () => {
		if (!name.trim()) {
			Alert.alert("Error", "Please enter a name");
			return;
		}
		if (selectedIndustries.length === 0) {
			Alert.alert("Error", "Please select at least one industry");
			return;
		}
		if (!region) {
			Alert.alert("Error", "Please select a region");
			return;
		}

		try {
			const db = await SQLite.openDatabaseAsync("signalvc.db");

			await db.execAsync(`
        CREATE TABLE IF NOT EXISTS profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          industries TEXT NOT NULL,
          region TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

			await db.runAsync(
				"INSERT INTO profiles (name, industries, region) VALUES (?, ?, ?)",
				[name, JSON.stringify(selectedIndustries), region],
			);

			Alert.alert("Success", "Profile saved successfully");
			setName("");
			setSelectedIndustries([]);
			setRegion("");
		} catch (error) {
			console.error("Database error:", error);
			Alert.alert("Error", "Failed to save profile");
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1 px-6 pt-8">
				<Text className="text-2xl font-bold text-gray-900 mb-8">
					Create Profile
				</Text>

				{/* Name Field */}
				<View className="mb-6">
					<Text className="text-sm font-medium text-gray-700 mb-2">Name</Text>
					<TextInput
						className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 bg-gray-50"
						placeholder="Enter your name"
						placeholderTextColor="#9CA3AF"
						value={name}
						onChangeText={setName}
					/>
				</View>

				{/* Industries Chips */}
				<View className="mb-6">
					<Text className="text-sm font-medium text-gray-700 mb-2">
						Industries
					</Text>
					<View className="flex-row flex-wrap gap-2">
						{INDUSTRIES.map((industry) => {
							const isSelected = selectedIndustries.includes(industry);
							return (
								<TouchableOpacity
									key={industry}
									onPress={() => toggleIndustry(industry)}
									className={`px-4 py-2 rounded-full border ${
										isSelected
											? "bg-blue-500 border-blue-500"
											: "bg-white border-gray-300"
									}`}
								>
									<Text
										className={`text-sm font-medium ${
											isSelected ? "text-white" : "text-gray-700"
										}`}
									>
										{industry}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				{/* Region Dropdown */}
				<View className="mb-8">
					<Text className="text-sm font-medium text-gray-700 mb-2">
						Geographical Region
					</Text>
					<TouchableOpacity
						onPress={() => setDropdownOpen(!dropdownOpen)}
						className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 flex-row justify-between items-center"
					>
						<Text
							className={`text-base ${region ? "text-gray-900" : "text-gray-400"}`}
						>
							{region
								? REGIONS.find((r) => r.value === region)?.label
								: "Select a region"}
						</Text>
						<Text className="text-gray-400">{dropdownOpen ? "▲" : "▼"}</Text>
					</TouchableOpacity>

					{dropdownOpen && (
						<View className="border border-gray-300 rounded-lg mt-1 bg-white shadow-sm">
							{REGIONS.filter((r) => r.value !== "").map((item) => (
								<TouchableOpacity
									key={item.value}
									onPress={() => {
										setRegion(item.value);
										setDropdownOpen(false);
									}}
									className={`px-4 py-3 border-b border-gray-100 ${
										region === item.value ? "bg-blue-50" : ""
									}`}
								>
									<Text
										className={`text-base ${
											region === item.value ? "text-blue-600" : "text-gray-700"
										}`}
									>
										{item.label}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					)}
				</View>

				{/* Save Button */}
				<TouchableOpacity
					onPress={handleSave}
					className="bg-blue-500 rounded-lg py-4 items-center mb-8"
				>
					<Text className="text-white text-base font-semibold">
						Save Profile
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
