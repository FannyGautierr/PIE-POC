<script setup lang="ts">
import { ref, computed } from 'vue';

const activeTab = ref('overview');

const matchedArtists = ref([
  {
    id: 1,
    name: 'The Echoes',
    genre: 'Rock Indé',
    followers: '45K',
    experience: 'Artiste local établi',
    region: 'Amérique du Nord',
    matchScore: 92,
    communityScore: 87,
    communityVotes: 342,
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+12%',
    engagement: 'Élevé',
    recentRelease: 'EP Rêves de Minuit',
    releaseDate: '2025-02-15',
    weeklyListens: 24500,
    weeklyChange: 8.5,
    socialLinks: ['instagram', 'spotify', 'youtube'],
    isNew: false,
    isSaved: true
  },
  {
    id: 2,
    name: 'Luna Wave',
    genre: 'Électronique',
    followers: '78K',
    experience: 'Reconnaissance régionale',
    region: 'Europe',
    matchScore: 87,
    communityScore: 92,
    communityVotes: 578,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+8%',
    engagement: 'Moyen',
    recentRelease: 'Horizon Numérique',
    releaseDate: '2025-01-20',
    weeklyListens: 18700,
    weeklyChange: 3.2,
    socialLinks: ['instagram', 'spotify', 'tiktok'],
    isNew: true,
    isSaved: true
  },
  {
    id: 3,
    name: 'Rhythm Collective',
    genre: 'Hip Hop',
    followers: '120K',
    experience: 'Reconnaissance régionale',
    region: 'Amérique du Nord',
    matchScore: 85,
    communityScore: 95,
    communityVotes: 1024,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+15%',
    engagement: 'Très Élevé',
    recentRelease: 'Ambiances Urbaines',
    releaseDate: '2025-03-10',
    weeklyListens: 42000,
    weeklyChange: 18.7,
    socialLinks: ['instagram', 'spotify', 'tiktok', 'youtube'],
    isNew: false,
    isSaved: false
  },
  {
    id: 4,
    name: 'Midnight Serenade',
    genre: 'Jazz',
    followers: '32K',
    experience: 'Artiste émergent',
    region: 'Europe',
    matchScore: 78,
    communityScore: 76,
    communityVotes: 128,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+5%',
    engagement: 'Moyen',
    recentRelease: 'Notes Bleues',
    releaseDate: '2024-12-05',
    weeklyListens: 9800,
    weeklyChange: 2.1,
    socialLinks: ['instagram', 'spotify'],
    isNew: false,
    isSaved: false
  },
  {
    id: 5,
    name: 'Electric Pulse',
    genre: 'Électronique',
    followers: '95K',
    experience: 'Reconnaissance nationale',
    region: 'Asie',
    matchScore: 76,
    communityScore: 84,
    communityVotes: 456,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+10%',
    engagement: 'Élevé',
    recentRelease: 'Lumières Néon',
    releaseDate: '2025-02-28',
    weeklyListens: 31500,
    weeklyChange: 7.8,
    socialLinks: ['instagram', 'spotify', 'youtube', 'soundcloud'],
    isNew: false,
    isSaved: false
  },
  {
    id: 6,
    name: 'Velvet Voice',
    genre: 'R&B',
    followers: '65K',
    experience: 'Artiste émergent',
    region: 'Amérique du Nord',
    matchScore: 89,
    communityScore: 89,
    communityVotes: 312,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+22%',
    engagement: 'Très Élevé',
    recentRelease: 'Nuits de Soul',
    releaseDate: '2025-03-15',
    weeklyListens: 28900,
    weeklyChange: 24.3,
    socialLinks: ['instagram', 'spotify', 'tiktok', 'youtube'],
    isNew: true,
    isSaved: false
  },
  {
    id: 7,
    name: 'Mountain Echo',
    genre: 'Folk',
    followers: '28K',
    experience: 'Artiste émergent',
    region: 'Europe',
    matchScore: 83,
    communityScore: 79,
    communityVotes: 98,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&h=100&auto=format&fit=crop',
    growth: '+7%',
    engagement: 'Moyen',
    recentRelease: 'Murmures de la Forêt',
    releaseDate: '2025-01-10',
    weeklyListens: 12400,
    weeklyChange: 5.6,
    socialLinks: ['instagram', 'spotify', 'bandcamp'],
    isNew: true,
    isSaved: false
  },
]);
const weeklySelections = computed(() => {
  return [...matchedArtists.value]
    .sort((a, b) => b.weeklyChange - a.weeklyChange)
    .slice(0, 3);
});

const newDiscoveries = computed(() => {
  return matchedArtists.value.filter(artist => artist.isNew);
});

const savedArtists = computed(() => {
  return matchedArtists.value.filter(artist => artist.isSaved);
});
const labelInfo = ref({
  name: 'Harmony Records',
  email: 'contact@harmonyrecords.com',
  genres: ['Rock Indé', 'Électronique', 'Hip Hop'],
  regions: ['Amérique du Nord', 'Europe'],
  audienceSize: ['10K-50K abonnés', '50K-100K abonnés'],
  artistExperience: ['Artiste émergent', 'Artiste local établi', 'Reconnaissance régionale'],
  joinDate: '2025-01-15',
  totalMatches: 42,
  savedArtists: 8,
  contactedArtists: 3
});


const globalStats = ref({
  totalArtistsInSystem: 2458,
  matchingYourCriteria: 42,
  averageMatchScore: 81,
  averageCommunityScore: 86,
  topGenres: [
    { name: 'Rock Indé', percentage: 28 },
    { name: 'Électronique', percentage: 24 },
    { name: 'Hip Hop', percentage: 18 },
    { name: 'R&B', percentage: 12 },
    { name: 'Pop', percentage: 10 },
    { name: 'Autre', percentage: 8 }
  ],
  regionDistribution: [
    { name: 'Amérique du Nord', percentage: 45 },
    { name: 'Europe', percentage: 32 },
    { name: 'Asie', percentage: 15 },
    { name: 'Autre', percentage: 8 }
  ],
  audienceSizeDistribution: [
    { name: 'Moins de 10K', percentage: 15 },
    { name: '10K-50K', percentage: 35 },
    { name: '50K-100K', percentage: 25 },
    { name: '100K-500K', percentage: 18 },
    { name: 'Plus de 500K', percentage: 7 }
  ],
  weeklyTrends: [
    { genre: 'R&B', change: '+15%' },
    { genre: 'Électronique', change: '+8%' },
    { genre: 'Folk', change: '+6%' }
  ]
});


const activityTimeline = ref([
  { date: '2025-03-25', action: 'Nouveau match d\'artiste : Velvet Voice', type: 'match' },
  { date: '2025-03-22', action: 'Contact établi avec The Echoes', type: 'contact' },
  { date: '2025-03-20', action: 'Luna Wave ajouté aux favoris', type: 'save' },
  { date: '2025-03-18', action: 'Nouveau match d\'artiste : Mountain Echo', type: 'match' },
  { date: '2025-03-15', action: 'Critères d\'artiste mis à jour', type: 'update' },
  { date: '2025-03-12', action: 'Contact établi avec Rhythm Collective', type: 'contact' },
]);



const filters = ref({
  genre: '',
  region: '',
  minMatchScore: 75
});

const filteredArtists = () => {
  return matchedArtists.value.filter(artist => {

    if (filters.value.genre && artist.genre !== filters.value.genre) {
      return false;
    }
    
    if (filters.value.region && artist.region !== filters.value.region) {
      return false;
    }
    
    if (artist.matchScore < filters.value.minMatchScore) {
      return false;
    }
    
    return true;
  });
};


const resetFilters = () => {
  filters.value = {
    genre: '',
    region: '',
    minMatchScore: 75
  };
};

const uniqueGenres = Array.from(new Set(matchedArtists.value.map(artist => artist.genre)));
const uniqueRegions = Array.from(new Set(matchedArtists.value.map(artist => artist.region)));

const selectedArtist = ref(null);
const showArtistModal = ref(false);

const openArtistDetails = (artist) => {
  selectedArtist.value = artist;
  showArtistModal.value = true;
};

const closeArtistModal = () => {
  showArtistModal.value = false;
};

const toggleSaveArtist = (artist) => {
  artist.isSaved = !artist.isSaved;
};
</script>

<template>
  <div class="container mx-auto py-8 px-4 max-w-6xl">    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ labelInfo.name }} Dashboard</h1>
        <p class="text-gray-600">Découvrez des artistes qui correspondent aux critères de votre label</p>
      </div>
      <div class="mt-4 md:mt-0 flex space-x-2">
        <router-link 
          to="/label-registration" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Modifier les critères
        </router-link>
        <button 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Exporter le rapport
        </button>
      </div>
    </div>
    
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8 overflow-x-auto">
        <button 
          @click="activeTab = 'overview'" 
          class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap" 
          :class="activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Vue d'ensemble
        </button>
        <button 
          @click="activeTab = 'weekly'" 
          class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap" 
          :class="activeTab === 'weekly' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Sélections hebdomadaires
        </button>
        <button 
          @click="activeTab = 'all'" 
          class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap" 
          :class="activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Tous les matches
        </button>
        <button 
          @click="activeTab = 'saved'" 
          class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap" 
          :class="activeTab === 'saved' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Artistes sauvegardés
        </button>
        <button 
          @click="activeTab = 'stats'" 
          class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap" 
          :class="activeTab === 'stats' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Statistiques
        </button>
      </nav>
    </div>
    
    <div>
      <div v-if="activeTab === 'overview'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Matchs total</h3>
            <p class="text-3xl font-bold">{{ labelInfo.totalMatches }}</p>
            <p class="text-sm text-green-600 mt-1">+5 cette semaine</p>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Artistes sauvegardés</h3>
            <p class="text-3xl font-bold">{{ labelInfo.savedArtists }}</p>
            <p class="text-sm text-green-600 mt-1">+2 cette semaine</p>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Artistes contactés</h3>
            <p class="text-3xl font-bold">{{ labelInfo.contactedArtists }}</p>
            <p class="text-sm text-green-600 mt-1">+1 cette semaine</p>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Score moyen des matchs</h3>
            <p class="text-3xl font-bold">{{ globalStats.averageMatchScore }}%</p>
            <p class="text-sm text-green-600 mt-1">+2% cette semaine</p>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Tendances cette semaine</h2>
            <button 
              @click="activeTab = 'weekly'" 
              class="text-sm text-blue-600 hover:text-blue-800"
            >
              Voir tout
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="artist in weeklySelections" 
              :key="artist.id"
              class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              @click="openArtistDetails(artist)"
            >
              <div class="flex items-center mb-3">
                <img 
                  :src="artist.image" 
                  :alt="artist.name"
                  class="w-12 h-12 rounded-full object-cover mr-3"
                >
                <div>
                  <h3 class="font-semibold">{{ artist.name }}</h3>
                  <p class="text-sm text-gray-600">{{ artist.genre }}</p>
                </div>
                <div class="ml-auto">
                  <span 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ artist.growth }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">{{ artist.followers }} followers</span>
                <span class="text-gray-500">{{ artist.region }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4">Activité récente</h2>
          
          <div class="space-y-4">
            <div 
              v-for="(activity, index) in activityTimeline" 
              :key="index"
              class="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                :class="{
                  'bg-blue-100 text-blue-600': activity.type === 'match',
                  'bg-green-100 text-green-600': activity.type === 'contact',
                  'bg-purple-100 text-purple-600': activity.type === 'save',
                  'bg-gray-100 text-gray-600': activity.type === 'update'
                }"
              >
                <svg v-if="activity.type === 'match'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12z" />
                </svg>
                <svg v-if="activity.type === 'contact'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                <svg v-if="activity.type === 'save'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <svg v-if="activity.type === 'update'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-800">{{ activity.action }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'weekly'" class="space-y-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-6">Tendances cette semaine</h2>
          <p class="text-gray-600 mb-6">Notre plateforme a sélectionné ces artistes en fonction de vos critères et des métriques de croissance récentes</p>
          
          <div class="space-y-4">
            <div 
              v-for="artist in weeklySelections" 
              :key="artist.id"
              class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              @click="openArtistDetails(artist)"
            >
              <div class="flex items-center">
                <img 
                  :src="artist.image" 
                  :alt="artist.name"
                  class="w-16 h-16 rounded-full object-cover mr-4"
                >
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-semibold text-lg">{{ artist.name }}</h3>
                      <p class="text-gray-600">{{ artist.genre }} • {{ artist.region }}</p>
                    </div>
                    <div class="text-right">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        Croissance hebdomadaire: {{ artist.growth }}
                      </span>
                      <p class="text-sm text-gray-500 mt-1">{{ artist.followers }} followers</p>
                    </div>
                  </div>
                  
                  <div class="mt-3 grid grid-cols-3 gap-4">
                    <div>
                      <p class="text-xs text-gray-500">Dernière sortie</p>
                      <p class="text-sm font-medium">{{ artist.recentRelease }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Ecoutes hebdomadaires</p>
                      <p class="text-sm font-medium">{{ artist.weeklyListens.toLocaleString() }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Engagement</p>
                      <p class="text-sm font-medium">{{ artist.engagement }}</p>
                    </div>
                  </div>
                  
                  <div class="mt-3 flex justify-between items-center">
                    <!-- <div class="flex space-x-2">
                      <span 
                        v-for="platform in artist.socialLinks" 
                        :key="platform"
                        class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"
                      >
                        <span class="text-xs">{{ platform.charAt(0).toUpperCase() }}</span>
                      </span>
                    </div> -->
                    <div>
                      <button 
                        class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        @click.stop="openArtistDetails(artist)"
                      >
                        Voir les détails
                      </button>
                      <button 
                        class="ml-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        @click.stop="toggleSaveArtist(artist)"
                      >
                        {{ artist.isSaved ? 'Saved' : 'Save' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4">Nouvelles découvertes</h2>
          <p class="text-gray-600 mb-4">Ces artistes sont de nouveaux matches qui correspondent à vos critères</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="artist in newDiscoveries" 
              :key="artist.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              @click="openArtistDetails(artist)"
            >
              <div class="flex items-center mb-3">
                <img 
                  :src="artist.image" 
                  :alt="artist.name"
                  class="w-12 h-12 rounded-full object-cover mr-3"
                >
                <div>
                  <h3 class="font-semibold">{{ artist.name }}</h3>
                  <p class="text-sm text-gray-600">{{ artist.genre }}</p>
                </div>
                <div class="ml-auto">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Nouveau
                  </span>
                </div>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">{{ artist.followers }} followers</span>
                <span class="text-gray-500">{{ artist.region }}</span>
              </div>
              <div class="mt-3 flex justify-end">
                <button 
                  class="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  @click.stop="openArtistDetails(artist)"
                >
                  View
                </button>
                <button 
                  class="ml-2 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  @click.stop="toggleSaveArtist(artist)"
                >
                  {{ artist.isSaved ? 'Saved' : 'Save' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4">Genres tendances cette semaine</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="trend in globalStats.weeklyTrends" 
              :key="trend.genre"
              class="bg-gray-50 rounded-lg p-4"
            >
              <h3 class="font-semibold text-lg">{{ trend.genre }}</h3>
              <p class="text-green-600 font-medium">{{ trend.change }} croissance</p>
              <p class="text-sm text-gray-600 mt-1">Considérez d'explorer plus d'artistes dans ce genre</p>
            </div>
          </div>
        </div>
      </div>
 
      <div v-if="activeTab === 'all'" class="space-y-6">

        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 class="text-xl font-semibold mb-4">Vos critères</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Genres</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="genre in labelInfo.genres" 
                  :key="genre"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {{ genre }}
                </span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Regions</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="region in labelInfo.regions" 
                  :key="region"
                  class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {{ region }}
                </span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Taille de la communauté</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="size in labelInfo.audienceSize" 
                  :key="size"
                  class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                >
                  {{ size }}
                </span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Experience artistique</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="level in labelInfo.artistExperience" 
                  :key="level"
                  class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                >
                  {{ level }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
          <div class="flex flex-col md:flex-row items-center gap-4">
            <div class="w-full md:w-1/4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select 
                v-model="filters.genre"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les genres</option>
                <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}</option>
              </select>
            </div>
            
            <div class="w-full md:w-1/4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select 
                v-model="filters.region"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Toutes les régions</option>
                <option v-for="region in uniqueRegions" :key="region" :value="region">{{ region }}</option>
              </select>
            </div>
            
            <div class="w-full md:w-1/4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Score de match minimum</label>
              <input 
                v-model="filters.minMatchScore" 
                type="range" 
                min="50" 
                max="100" 
                step="5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              >
              <div class="text-center text-sm mt-1">{{ filters.minMatchScore }}%</div>
            </div>
            
            <div class="w-full md:w-1/4 flex items-end">
              <button 
                @click="resetFilters"
                class="w-full md:mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            v-for="artist in filteredArtists()" 
            :key="artist.id"
            class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            @click="openArtistDetails(artist)"
          >
            <div class="p-5">
              <div class="flex items-center mb-4">
                <img 
                  :src="artist.image" 
                  :alt="artist.name"
                  class="w-16 h-16 rounded-full object-cover mr-4"
                >
                <div>
                  <h3 class="text-lg font-semibold">{{ artist.name }}</h3>
                  <p class="text-gray-600">{{ artist.genre }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p class="text-xs text-gray-500">Followers</p>
                  <p class="font-medium">{{ artist.followers }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Region</p>
                  <p class="font-medium">{{ artist.region }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Experience artistique</p>
                  <p class="font-medium">{{ artist.experience }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Score de match</p>
                  <div class="flex items-center">
                    <div 
                      class="h-2 rounded-full mr-2"
                      :class="{
                        'bg-green-500': artist.matchScore >= 85,
                        'bg-yellow-500': artist.matchScore >= 75 && artist.matchScore < 85,
                        'bg-orange-500': artist.matchScore < 75
                      }"
                      :style="{ width: `${artist.matchScore / 2}px` }"
                    ></div>
                    <span 
                      :class="{
                        'text-green-600': artist.matchScore >= 85,
                        'text-yellow-600': artist.matchScore >= 75 && artist.matchScore < 85,
                        'text-orange-600': artist.matchScore < 75
                      }"
                    >
                      {{ artist.matchScore }}%
                    </span>
                  </div>
                </div>
                <div class="col-span-2">
                  <p class="text-xs text-gray-500">Score de la communauté</p>
                  <div class="flex items-center justify-between ">
                    <div class="flex items-center">
                      <div 
                        class="h-2 rounded-full mr-2 bg-green-500"
                        :style="{ width: `${artist.communityScore / 2}px` }"
                      ></div>
                      <span class="text-green-600">{{ artist.communityScore }}%</span>
                    </div>
                    <span class="text-xs text-gray-400">({{ artist.communityVotes }} votes)</span>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-between">
                <button 
                  class="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm"
                  @click.stop="openArtistDetails(artist)"
                >
                  View Profile
                </button>
                <button 
                  class="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  @click.stop="toggleSaveArtist(artist)"
                >
                  {{ artist.isSaved ? 'Saved' : 'Save' }}
                </button>
              </div>
            </div>
          </div>

          <div 
            v-if="filteredArtists().length === 0" 
            class="col-span-full bg-gray-50 rounded-lg border border-gray-200 p-8 text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Aucun artiste ne correspond à vos filtres</h3>
            <p class="text-gray-500 mb-4">Essayez de ajuster vos filtres ou vérifiez plus tard pour de nouveaux matches.</p>
            <button 
              @click="resetFilters"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      </div>
      

      <div v-if="activeTab === 'saved'" class="space-y-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4">Artistes sauvegardés</h2>
          <p class="text-gray-600 mb-6">Artistes que vous avez sauvegardés</p>
          
          <div v-if="savedArtists.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="artist in savedArtists" 
              :key="artist.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center">
                <img 
                  :src="artist.image" 
                  :alt="artist.name"
                  class="w-16 h-16 rounded-full object-cover mr-4"
                >
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-semibold">{{ artist.name }}</h3>
                      <p class="text-sm text-gray-600">{{ artist.genre }} • {{ artist.region }}</p>
                      <p class="text-sm text-gray-500">{{ artist.followers }} followers</p>
                    </div>
                    <div>
                      <div class="space-y-1">
                        <span 
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                          :class="{
                            'bg-green-100 text-green-800': artist.matchScore >= 85,
                            'bg-yellow-100 text-yellow-800': artist.matchScore >= 75 && artist.matchScore < 85,
                            'bg-orange-100 text-orange-800': artist.matchScore < 75
                          }"
                        >
                          {{ artist.matchScore }}% match
                        </span>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {{ artist.communityScore }}% community
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 flex justify-end space-x-2">
                    <button 
                      class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      @click="openArtistDetails(artist)"
                    >
                      Voir le profil
                    </button>
                    <button 
                      class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      @click="toggleSaveArtist(artist)"
                    >
                      {{ artist.isSaved ? 'Saved' : 'Save' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Aucun artiste sauvegardé</h3>
            <p class="text-gray-500 mb-4">Lorsque vous trouvez des artistes qui vous intéressent, sauvegardez-les ici pour une accès facile.</p>
            <button 
              @click="activeTab = 'all'"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Parcourir les artistes
            </button>
          </div>
        </div>
      </div>
      

      <div v-if="activeTab === 'stats'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 class="text-xl font-semibold mb-4">Genre Distribution</h2>
            <div class="space-y-4">
              <div v-for="genre in globalStats.topGenres" :key="genre.name" class="relative pt-1">
                <div class="flex items-center justify-between mb-1">
                  <div>
                    <span class="text-sm font-medium text-gray-700">{{ genre.name }}</span>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-700">{{ genre.percentage }}%</span>
                  </div>
                </div>
                <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    :style="{ width: `${genre.percentage}%` }" 
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 class="text-xl font-semibold mb-4">Region Distribution</h2>
            <div class="space-y-4">
              <div v-for="region in globalStats.regionDistribution" :key="region.name" class="relative pt-1">
                <div class="flex items-center justify-between mb-1">
                  <div>
                    <span class="text-sm font-medium text-gray-700">{{ region.name }}</span>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-700">{{ region.percentage }}%</span>
                  </div>
                </div>
                <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    :style="{ width: `${region.percentage}%` }" 
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4">Audience Size Distribution</h2>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div 
              v-for="size in globalStats.audienceSizeDistribution" 
              :key="size.name"
              class="text-center"
            >
              <div 
                class="mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center"
                :style="{ width: `${Math.max(size.percentage * 2, 40)}px`, height: `${Math.max(size.percentage * 2, 40)}px` }"
              >
                <span class="text-purple-800 font-medium">{{ size.percentage }}%</span>
              </div>
              <p class="text-sm font-medium">{{ size.name }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4">Statistiques de la plateforme</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Nombre total d'artistes</h3>
              <p class="text-2xl font-bold">{{ globalStats.totalArtistsInSystem.toLocaleString() }}</p>
              <p class="text-sm text-gray-600 mt-1">Sur tous les genres et régions</p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Artistes correspondants</h3>
              <p class="text-2xl font-bold">{{ globalStats.matchingYourCriteria }}</p>
              <p class="text-sm text-gray-600 mt-1">{{ ((globalStats.matchingYourCriteria / globalStats.totalArtistsInSystem) * 100).toFixed(1) }}% des artistes</p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Score de correspondance moyen</h3>
              <p class="text-2xl font-bold">{{ globalStats.averageMatchScore }}%</p>
              <p class="text-sm text-gray-600 mt-1">Sur les critères sélectionnés</p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Score moyen de la communauté</h3>
              <p class="text-2xl font-bold text-green-600">{{ globalStats.averageCommunityScore }}%</p>
              <p class="text-sm text-gray-600 mt-1">Sur la communauté</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Artist D tail Modal -->
    <div v-if="showArtistModal && selectedArtist" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center">
              <img 
                :src="selectedArtist.image" 
                :alt="selectedArtist.name"
                class="w-20 h-20 rounded-full object-cover mr-4"
              >
              <div>
                <h2 class="text-2xl font-bold">{{ selectedArtist.name }}</h2>
                <p class="text-gray-600">{{ selectedArtist.genre }}</p>
              </div>
            </div>
            <button @click="closeArtistModal" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Followers</p>
              <p class="font-semibold">{{ selectedArtist.followers }}</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Region</p>
              <p class="font-semibold">{{ selectedArtist.region }}</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Experience</p>
              <p class="font-semibold">{{ selectedArtist.experience }}</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Match Score</p>
              <p 
                class="font-semibold"
                :class="{
                  'text-green-600': selectedArtist.matchScore >= 85,
                  'text-yellow-600': selectedArtist.matchScore >= 75 && selectedArtist.matchScore < 85,
                  'text-orange-600': selectedArtist.matchScore < 75
                }"
              >
                {{ selectedArtist.matchScore }}%
              </p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg col-span-2">
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-500 mb-1">Score de communauté</p>
                <span class="text-xs text-gray-500">({{ selectedArtist.communityVotes }} votes)</span>
              </div>
              <p class="font-semibold text-green-600">{{ selectedArtist.communityScore }}%</p>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">A propos</h3>
            <p class="text-gray-700">
              {{ selectedArtist.name }} is a  {{ selectedArtist.genre }} artist with {{ selectedArtist.followers }} followers. 
              They have achieved {{ selectedArtist.experience.toLowerCase() }} and are primarily based in {{ selectedArtist.region }}.
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Pourquoi c'est une bonne correspondance</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Correspond à vos préférences ({{ selectedArtist.genre }})</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Correspond à une de vos régions cible ({{ selectedArtist.region }})</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Taille du public cible aligner avec vos préférences</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Son niveau d'expérience correspond à votre recherche ({{ selectedArtist.experience }})</span>
              </li>
            </ul>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors" @click="closeArtistModal">
              Fermer
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Contacter l'artiste
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>