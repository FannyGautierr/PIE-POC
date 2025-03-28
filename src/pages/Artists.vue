<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ThumbsUp, ChevronRight, Search, X } from 'lucide-vue-next';
import artistsData from '@/data/artists.json';

// Import artists from JSON file
const allArtists = ref([...artistsData.artists]);

// Group artists by genre for the default view
const genres = ref([
  {
    id: 1,
    name: 'Rap',
    artists: allArtists.value.filter(artist => artist.genre === 'Rap')
  },
  {
    id: 2,
    name: 'Pop',
    artists: allArtists.value.filter(artist => artist.genre === 'Pop')
  },
  {
    id: 3,
    name: 'R&B',
    artists: allArtists.value.filter(artist => artist.genre === 'R&B')
  }
]);

// Search and filter state
const searchQuery = ref('');
const isSearchActive = ref(false);
const sortOption = ref('upvotes'); // 'upvotes', 'ratio'
const filterGenre = ref('all'); // 'all', 'Rap', 'Pop', 'R&B', etc.
const searchTimeout = ref<number | null>(null);

// Debounced search function
const debouncedSearch = (value: string) => {
  // Clear any existing timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  
  // Set a new timeout
  searchTimeout.value = setTimeout(() => {
    if (value.trim().length > 0) {
      isSearchActive.value = true;
    } else if (value.trim().length === 0 && isSearchActive.value) {
      // Only clear search if it was previously active and query is now empty
      clearSearch();
    }
  }, 300); // 300ms debounce delay
};

// Watch for changes to searchQuery and trigger debounced search
watch(searchQuery, (newValue) => {
  debouncedSearch(newValue);
});

// Filtered and sorted artists based on search query and filters
const filteredArtists = computed(() => {
  // If search is not active, return empty array (will show genres view)
  if (!isSearchActive.value) return [];
  
  // Start with all artists
  let result = [...allArtists.value];
  
  // Apply search filter if query exists
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(artist => 
      artist.name.toLowerCase().includes(query) || 
      artist.genre.toLowerCase().includes(query)
    );
  }
  
  // Apply genre filter if not set to 'all'
  if (filterGenre.value !== 'all') {
    result = result.filter(artist => artist.genre === filterGenre.value);
  }
  
  // Apply sorting
  switch (sortOption.value) {
    case 'upvotes':
      result.sort((a, b) => b.upvotes - a.upvotes);
      break;
    case 'ratio':
      result.sort((a, b) => {
        const ratioA = a.upvotes / (a.upvotes + 1); // Ajout de 1 pour éviter division par zéro
        const ratioB = b.upvotes / (b.upvotes + 1);
        return ratioB - ratioA;
      });
      break;
  }
  
  return result;
});

// Available genres for filter dropdown
const availableGenres = computed(() => {
  const genreSet = new Set(allArtists.value.map(artist => artist.genre));
  return ['all', ...Array.from(genreSet)];
});

// Clear search and return to genre view
const clearSearch = () => {
  searchQuery.value = '';
  isSearchActive.value = false;
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = null;
  }
};

// Format number with K/M suffix
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Calculate vote ratio for progress bar
const getVoteRatio = (upvotes: number): number => {
  return Math.min(upvotes / 100 * 10, 100); // Échelle relative basée sur les upvotes
};

// User's votes (in a real app, this would be stored in a database)
const userVotes = ref<Record<number, 'up' | null>>({});

// Handle upvote
const handleUpvote = (artistId: number, genreIndex: number = -1, artistIndex: number = -1) => {
  let artist;
  
  if (genreIndex >= 0 && artistIndex >= 0) {
    // Upvoting from genre view
    artist = genres.value[genreIndex].artists[artistIndex];
  } else {
    // Upvoting from search results
    artist = allArtists.value.find(a => a.id === artistId);
    if (!artist) return;
  }
  
  if (userVotes.value[artistId] === 'up') {
    // Remove upvote
    artist.upvotes--;
    userVotes.value[artistId] = null;
  } else {
    // Add upvote
    artist.upvotes++;
    userVotes.value[artistId] = 'up';
  }
};
</script>

<template>
  <div class="p-6 md:p-12">
    <h1 class="text-4xl font-bold mb-6">Artistes</h1>
    
    <!-- Search and filter bar -->
    <div class="mb-12">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search input -->
        <div class="relative flex-grow">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
            <Search class="size-5 text-gray-400" />
          </div>
          <Input 
            v-model="searchQuery"
            placeholder="Rechercher des artistes ou genres..." 
            class="pl-10"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X class="size-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        <!-- Filters -->
        <div class="flex gap-2">
          <!-- Genre filter -->
          <Select v-model="filterGenre" @update:model-value="isSearchActive = true">
            <SelectTrigger class="w-[140px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les genres</SelectItem>
              <SelectItem 
                v-for="genre in availableGenres.filter(g => g !== 'all')" 
                :key="genre" 
                :value="genre"
              >
                {{ genre }}
              </SelectItem>
            </SelectContent>
          </Select>
          
          <!-- Sort options -->
          <Select v-model="sortOption" @update:model-value="isSearchActive = true">
            <SelectTrigger class="w-[160px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
          </Select>
        </div>
      </div>
    </div>
    
    <!-- Search Results View (when search is active) -->
    <div v-if="isSearchActive" class="mb-12">
      <Card class="p-6 shadow-sm">
        <h2 class="text-2xl font-bold mb-6">
          Résultats de recherche
          <span class="text-sm font-normal text-gray-500 ml-2">{{ filteredArtists.length }} artistes trouvés</span>
        </h2>
        
        <div v-if="filteredArtists.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <!-- Artist cards -->
          <div v-for="artist in filteredArtists" :key="artist.id" class="flex flex-col">
            <RouterLink :to="`/artist/${artist.id}`" class="flex-grow">
              <Card class="relative overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                <img :src="artist.image" :alt="artist.name" class="w-full aspect-square object-cover">
                <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"/>
                <div class="p-3 flex flex-col justify-end absolute top-0 left-0 w-full h-full text-white">
                  <h3 class="text-xl font-medium">{{ artist.name }}</h3>
                  <p class="text-sm opacity-80">{{ artist.genre }}</p>
                  
                  <!-- Vote counts with interactive buttons -->
                  <div class="flex justify-between text-xs pt-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      class="rounded-full px-2 py-1 h-auto flex items-center gap-1 text-xs border bg-white/10 border-gray-500 hover:text-green-500 text-white hover:bg-green-900/30 hover:border-green-400"
                      :class="{ 'bg-green-900/50 border-green-400 text-green-400': userVotes[artist.id] === 'up' }"
                      @click.prevent="handleUpvote(artist.id)"
                    >
                      <ThumbsUp class="size-3" /> {{ formatNumber(artist.upvotes) }}
                    </Button>
                  </div>
                </div>
              </Card>
            </RouterLink>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-500">Aucun artiste ne correspond à vos critères de recherche.</p>
        </div>
      </Card>
    </div>
    
    <!-- Genre View (when search is not active) -->
    <div v-else>
      <!-- Genre sections -->
      <div v-for="(genre, genreIndex) in genres" :key="genre.id" class="mb-12">
        <Card class="p-6 shadow-sm">
          <h2 class="text-2xl font-bold mb-6">{{ genre.name }}</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <!-- Artist cards -->
            <div v-for="(artist, artistIndex) in genre.artists" :key="artist.id" class="flex flex-col">
              <RouterLink :to="`/artist/${artist.id}`" class="flex-grow">
                <Card class="relative overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                  <img :src="artist.image" :alt="artist.name" class="w-full aspect-square object-cover">
                  <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"/>
                  <div class="p-3 flex flex-col justify-end absolute top-0 left-0 w-full h-full text-white">
                    <h3 class="text-xl font-medium">{{ artist.name }}</h3>
                    
                    <!-- Vote counts with interactive buttons -->
                    <div class="flex justify-between text-xs pt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        class="rounded-full px-2 py-1 h-auto flex items-center gap-1 text-xs border bg-white/10 border-gray-500 hover:text-green-500 text-white hover:bg-green-900/30 hover:border-green-400"
                        :class="{ 'bg-green-900/50 border-green-400 text-green-400': userVotes[artist.id] === 'up' }"
                        @click.prevent="handleUpvote(artist.id, genreIndex, artistIndex)"
                      >
                        <ThumbsUp class="size-3" /> {{ formatNumber(artist.upvotes) }}
                      </Button>
                    </div>
                  </div>
                </Card>
              </RouterLink>
            </div>
            
            <!-- See More card -->
            <div class="flex flex-col">
              <RouterLink :to="`/genre/${genre.id}`" class="flex-grow">
                <Card class="hover:bg-neutral-100 hover:shadow-md relative overflow-hidden h-full duration-300 flex items-center justify-center">
                  <div class="flex flex-col items-center justify-center p-4 h-full">
                    <div class="bg-gray-200 rounded-full p-3 mb-3">
                      <ChevronRight class="size-6 text-gray-600" />
                    </div>
                    <p class="text-lg font-medium text-gray-700">See More</p>
                  </div>
                </Card>
              </RouterLink>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>