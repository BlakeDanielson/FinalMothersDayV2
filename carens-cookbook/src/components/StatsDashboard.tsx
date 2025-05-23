import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecipeData } from "@/components/RecipeDisplay";
import { calculateRecipeStats } from "@/lib/stats";
import StatsCard from "./StatsCard";
import { motion } from "framer-motion";
import { 
  ChefHat, 
  FolderOpen, 
  Clock, 
  TrendingUp, 
  PieChart as ChartIcon,
  Star,
  Calendar,
  Activity
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface StatsDashboardProps {
  recipes: RecipeData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f', '#0088fe'];

export default function StatsDashboard({ recipes }: StatsDashboardProps) {
  const stats = calculateRecipeStats(recipes);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <ChartIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Stats Available</h3>
        <p className="text-muted-foreground">Add some recipes to see your collection statistics!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Collection Stats</h2>
        <p className="text-muted-foreground text-center">
          Insights into your recipe collection
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Recipes"
          value={stats.totalRecipes}
          icon={ChefHat}
          description="recipes in collection"
          color="primary"
          delay={0.1}
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          icon={FolderOpen}
          description="different categories"
          color="blue"
          delay={0.2}
        />
        <StatsCard
          title="Avg Prep Time"
          value={stats.averagePrepTime > 0 ? `${stats.averagePrepTime}m` : "N/A"}
          icon={Clock}
          description="average preparation"
          color="green"
          delay={0.3}
        />
        <StatsCard
          title="Growth"
          value={`+${Math.floor(stats.totalRecipes / 6)}`}
          icon={TrendingUp}
          description="recipes this month"
          color="orange"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChartIcon className="h-5 w-5" />
              Category Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryDistribution.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.categoryDistribution.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Difficulty Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recipe Difficulty
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.difficultyDistribution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="difficulty" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Categories & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Top Categories
            </h3>
            <div className="space-y-3">
              {stats.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary">{category.count} recipes</Badge>
                </div>
              ))}
              {stats.topCategories.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No categories yet</p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Recent Recipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Additions
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {stats.recentRecipes.slice(0, 5).map((recipe, index) => (
                <div key={recipe.title + index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ChefHat className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{recipe.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {recipe.category || 'Uncategorized'}
                    </p>
                  </div>
                </div>
              ))}
              {stats.recentRecipes.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No recent recipes</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Common Ingredients */}
      {stats.commonIngredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Common Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {stats.commonIngredients.map((ingredient) => (
                <Badge 
                  key={ingredient.ingredient} 
                  variant="outline" 
                  className="px-3 py-1"
                >
                  {ingredient.ingredient} ({ingredient.count})
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
} 