"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect, type Option } from "@/components/ui/multi-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { COUNTRIES } from "@/consts/countries";
import { TARGET_MARKETS } from "@/consts/target-markets";
import {
	deleteDatabase,
	getAllConfigs,
	saveConfig,
	type RecoConfig,
} from "@/lib/db";
import { useGetFeedMutation } from "@/lib/features/api/recoApi";
import { Loader2, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// --- Constants ---

const US_STATES = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];

const DOMAINS = [
	"Fintech",
	"HealthTech",
	"EdTech",
	"E-commerce",
	"SaaS",
	"Cybersecurity",
	"AI/ML",
	"Blockchain",
	"Gaming",
	"IoT",
	"CleanTech",
	"BioTech",
	"AdTech",
	"MarTech",
	"Logistics",
];

const BUSINESS_CATEGORIES = [
	"Data Solutions",
	"Hosting & Cloud Infrastructure Providers",
	"Tech Companies",
	"Consulting Firms",
	"Agencies",
	"Startups",
	"Enterprise",
];

// Helper to map strings to Options
const toOptions = (list: string[]): Option[] =>
	list.map((item) => ({ label: item, value: item }));

const domainOptions = toOptions(DOMAINS);
const businessCategoryOptions = toOptions(BUSINESS_CATEGORIES);
const targetMarketOptions = toOptions(TARGET_MARKETS);

// --- Component ---

export default function ConfigPage() {
	// Form State
	const [name, setName] = useState("");
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");
	const [domains, setDomains] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [markets, setMarkets] = useState<string[]>([]); // Target Markets

	// Sliders
	const [sliderCountries, setSliderCountries] = useState(0.5);
	const [sliderCategories, setSliderCategories] = useState(0.5);
	const [sliderMarkets, setSliderMarkets] = useState(0.5);

	// App State
	const [savedConfigs, setSavedConfigs] = useState<RecoConfig[]>([]);
	const [selectedConfigId, setSelectedConfigId] = useState<string>("");
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	// API Mutation
	const [
		getFeed,
		{ data: feedData, isLoading: isFeedLoading, error: feedError },
	] = useGetFeedMutation();

	useEffect(() => {
		loadConfigs();
	}, []);

	const loadConfigs = async () => {
		try {
			const configs = await getAllConfigs();
			setSavedConfigs(
				configs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
			);
		} catch (e) {
			console.error("Failed to load configs", e);
		}
	};

	const handleSave = async () => {
		if (!name.trim()) return;

		const config = {
			name,
			location: {
				country,
				region:
					country.toLowerCase().includes("united states") ||
					country === "US" ||
					country === "USA"
						? region
						: undefined,
			},
			domains,
			businessCategories: categories,
			targetMarkets: markets,
			sliders: {
				countries: sliderCountries,
				businessCategories: sliderCategories,
				targetMarkets: sliderMarkets,
			},
		};

		await saveConfig(config as any);
		await loadConfigs();
	};

	const handleGetFeed = () => {
		getFeed({
			filters: {
				countries: country ? [country] : [],
				target_markets: markets,
				business_categories: categories,
			},
			weights: {
				countries: sliderCountries,
				target_markets: sliderMarkets,
				business_categories: sliderCategories,
			},
		});
	};

	const handleLoadConfig = (id: string) => {
		const config = savedConfigs.find((c) => c.id?.toString() === id);
		if (!config) return;

		setName(config.name);
		setCountry(config.location.country);
		setRegion(config.location.region || "");
		setDomains(config.domains);
		setCategories(config.businessCategories);
		// @ts-ignore
		setMarkets(config.targetMarkets || []);

		setSliderCountries(config.sliders.countries);
		setSliderCategories(config.sliders.businessCategories);
		setSliderMarkets(config.sliders.targetMarkets);

		setSelectedConfigId(id);
	};

	const handleDeleteDB = async () => {
		await deleteDatabase();
		setSavedConfigs([]);
		setSelectedConfigId("");
		// Reset form
		setName("");
		setCountry("");
		setRegion("");
		setDomains([]);
		setCategories([]);
		setMarkets([]);
		setSliderCountries(0.5);
		setSliderCategories(0.5);
		setSliderMarkets(0.5);
		setShowDeleteConfirm(false);
	};

	return (
		<div className="min-h-screen bg-background p-4 md:p-8 font-sans">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Left Column: Form */}
				<div className="relative h-[calc(100vh-8rem)] sticky top-8">
					<div className="space-y-6 h-full overflow-y-auto lg:pr-2 pb-4 custom-scrollbar">
						{/* Saved Configurations (Moved to Top) */}
						<div className="flex flex-col gap-4 sticky top-0 bg-background z-10 py-2">
							<div className="flex gap-2 items-end">
								<div className="flex-1 space-y-2">
									<Label>Load Configuration</Label>
									<Select
										value={selectedConfigId}
										onValueChange={handleLoadConfig}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a saved config..." />
										</SelectTrigger>
										<SelectContent>
											{savedConfigs.length === 0 ? (
												<div className="p-2 text-sm text-muted-foreground text-center">
													No saved configs
												</div>
											) : (
												savedConfigs.map((config) => (
													<SelectItem
														key={config.id}
														value={config.id!.toString()}
													>
														{config.name}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
								</div>

								<Dialog
									open={showDeleteConfirm}
									onOpenChange={setShowDeleteConfirm}
								>
									<DialogTrigger asChild>
										<Button
											variant="destructive"
											size="icon"
											title="Delete Database"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Are you sure?</DialogTitle>
											<DialogDescription>
												This action cannot be undone. This will permanently
												delete all saved configurations from your browser's
												database.
											</DialogDescription>
										</DialogHeader>
										<DialogFooter>
											<Button
												variant="ghost"
												onClick={() => setShowDeleteConfirm(false)}
											>
												Cancel
											</Button>
											<Button variant="destructive" onClick={handleDeleteDB}>
												Delete
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
							<Separator />
						</div>
						<Card className="border-border shadow-sm">
							<CardHeader>
								<CardTitle>Recommendation Algorithm Configuration</CardTitle>
								<CardDescription>
									Configure the weights and filters for the recommendation
									engine.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Name */}
								<div className="space-y-2">
									<Label htmlFor="name">Configuration Name</Label>
									<Input
										id="name"
										placeholder="e.g. US Tech Growth"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<Separator />

								{/* Location */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Country</Label>
										<Select value={country} onValueChange={setCountry}>
											<SelectTrigger>
												<SelectValue placeholder="Select country" />
											</SelectTrigger>
											<SelectContent className="max-h-[300px]">
												{COUNTRIES.map((c) => (
													<SelectItem key={c} value={c}>
														{c}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								{/* Multiple Selects */}
								<div className="space-y-4">
									<div className="space-y-2">
										<Label>Business Categories</Label>
										<MultiSelect
											placeholder="Select categories..."
											options={businessCategoryOptions}
											selected={categories}
											onChange={setCategories}
										/>
									</div>

									<div className="space-y-2">
										<Label>Target Markets</Label>
										<MultiSelect
											placeholder="Select target markets..."
											options={targetMarketOptions}
											selected={markets}
											onChange={setMarkets}
										/>
									</div>
								</div>

								<Separator />

								{/* Sliders */}
								<div className="space-y-6">
									<h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										Weights Configuration
									</h3>

									<div className="space-y-3">
										<div className="flex justify-between">
											<Label>Countries Weight</Label>
											<span className="text-xs text-muted-foreground">
												{sliderCountries.toFixed(2)}
											</span>
										</div>
										<Slider
											value={[sliderCountries]}
											min={0}
											max={1}
											step={0.01}
											onValueChange={([v]) => setSliderCountries(v)}
										/>
									</div>

									<div className="space-y-3">
										<div className="flex justify-between">
											<Label>Business Categories Weight</Label>
											<span className="text-xs text-muted-foreground">
												{sliderCategories.toFixed(2)}
											</span>
										</div>
										<Slider
											value={[sliderCategories]}
											min={0}
											max={1}
											step={0.01}
											onValueChange={([v]) => setSliderCategories(v)}
										/>
									</div>

									<div className="space-y-3">
										<div className="flex justify-between">
											<Label>Target Markets Weight</Label>
											<span className="text-xs text-muted-foreground">
												{sliderMarkets.toFixed(2)}
											</span>
										</div>
										<Slider
											value={[sliderMarkets]}
											min={0}
											max={1}
											step={0.01}
											onValueChange={([v]) => setSliderMarkets(v)}
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full" onClick={handleSave}>
									<Save className="w-4 h-4 mr-2" />
									Save Configuration
								</Button>
							</CardFooter>
						</Card>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
				</div>

				{/* Right Column: Feed Results */}
				<div className="relative h-[calc(100vh-8rem)] sticky top-8">
					<div className="space-y-6 h-full overflow-y-auto lg:pr-2 pb-4 custom-scrollbar">
						<div className="flex items-center justify-between sticky top-0 bg-background z-10 py-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Recommendation Feed
							</h2>
							<Button onClick={handleGetFeed} disabled={isFeedLoading}>
								{isFeedLoading && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								Get Feed
							</Button>
						</div>

						<div className="space-y-4">
							{/* Error State */}
							{feedError && (
								<div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-900">
									Failed to fetch feed. Please try again.
								</div>
							)}

							{/* Empty State */}
							{!isFeedLoading &&
								(!feedData || feedData.length === 0) &&
								!feedError && (
									<div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
										<p>No recommendations yet.</p>
										<p className="text-sm mt-1">
											Configure your filters and click "Get Feed"
										</p>
									</div>
								)}

							{/* Loading Skeleton */}
							{isFeedLoading && (
								<div className="space-y-4">
									{[1, 2, 3].map((i) => (
										<Card key={i} className="animate-pulse">
											<CardHeader className="h-24 bg-muted/50" />
											<CardContent className="h-32 bg-muted/20" />
										</Card>
									))}
								</div>
							)}

							{/* Results */}
							{feedData?.map((card) => (
								<Card
									key={card.id}
									className="overflow-hidden hover:border-primary/50 transition-colors"
								>
									<CardHeader className="pb-3">
										<div className="flex justify-between items-start gap-4">
											<div>
												<CardTitle className="text-lg">
													{card.operational_name}
												</CardTitle>
												<div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
													<span>{card.country_name}</span>
													{card.relevance_score > 0 && (
														<Badge variant="secondary" className="text-xs">
															Match: {(card.relevance_score * 100).toFixed(0)}%
														</Badge>
													)}
												</div>
											</div>
										</div>
									</CardHeader>
									<CardContent className="space-y-4">
										<p className="text-sm text-muted-foreground line-clamp-3">
											{card.description}
										</p>

										{card.target_markets && card.target_markets.length > 0 && (
											<div className="flex flex-wrap gap-2">
												{card.target_markets.map((market) => (
													<Badge
														key={market}
														variant="outline"
														className="text-xs font-normal"
													>
														{market}
													</Badge>
												))}
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
				</div>
			</div>
		</div>
	);
}
