<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
const labelName = ref('');
const email = ref('');
const website = ref('');
const description = ref('');

const genrePreferences = ref<string[]>([]);
const audienceSize = ref<string[]>([]);
const artistExperience = ref<string[]>([]);
const marketRegions = ref<string[]>([]);
const budgetRange = ref<string | null>(null);

const genres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Électronique', 'Country', 
  'Jazz', 'Classique', 'Folk', 'Metal', 'Indie', 'Latin'
];

const audienceSizes = [
  'Moins de 10K abonnés', '10K-50K abonnés', '50K-100K abonnés', 
  '100K-500K abonnés', '500K-1M abonnés', 'Plus de 1M abonnés'
];

const experienceLevels = [
  'Artiste émergent', 'Artiste local établi', 'Reconnaissance régionale', 
  'Reconnaissance nationale', 'Reconnaissance internationale'
];

const regions = [
  'Amérique du Nord', 'Amérique du Sud', 'Europe', 'Asie', 
  'Afrique', 'Australie/Océanie', 'Mondial'
];

const budgetRanges = [
  'Moins de 5 000€', '5 000€-25 000€', '25 000€-50 000€', 
  '50 000€-100 000€', 'Plus de 100 000€'
];

// Soumission du formulaire
const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log({
      labelInfo: {
        name: labelName.value,
        email: email.value,
        website: website.value,
        description: description.value
      },
      artistCriteria: {
        genrePreferences: genrePreferences.value,
        audienceSize: audienceSize.value,
        artistExperience: artistExperience.value,
        marketRegions: marketRegions.value,
        budgetRange: budgetRange.value
      }
    });
    
    isSuccess.value = true;
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de votre inscription. Veuillez réessayer.';
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const toggleSelection = (array: string[], item: string) => {
  const index = array.indexOf(item);
  if (index === -1) {
    array.push(item);
  } else {
    array.splice(index, 1);
  }
};
</script>

<template>
  <div class="container mx-auto py-10 px-4 max-w-4xl">
    <Card v-if="isSuccess" class="bg-green-50 border-green-200 mb-8">
      <CardContent class="pt-6">
        <h2 class="text-2xl font-bold text-green-800 mb-2">Inscription Réussie !</h2>
        <p class="text-green-700 mb-4">
          Merci d'avoir inscrit votre label. Nous commencerons à vous proposer des artistes qui correspondent à vos critères.
        </p>
        <Button 
          @click="isSuccess = false" 
          variant="default"
          class="bg-green-600 hover:bg-green-700"
        >
          Inscrire un Autre Label
        </Button>
      </CardContent>
    </Card>
    
    <div v-else>
      <h1 class="text-3xl font-bold mb-2">Inscription Label</h1>
      <p class="text-gray-600 mb-8">Inscrivez votre label et dites-nous quel type d'artistes vous recherchez.</p>
      
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations du Label</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
            <div>
              <label for="labelName" class="block text-sm font-medium text-gray-700 mb-1">Nom du Label *</label>
              <Input 
                id="labelName" 
                v-model="labelName" 
                type="text" 
                required
                placeholder="Entrez le nom de votre label"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse Email *</label>
              <Input 
                id="email" 
                v-model="email" 
                type="email" 
                required
                placeholder="votre@email.com"
              />
            </div>
            
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700 mb-1">Site Web</label>
              <Input 
                id="website" 
                v-model="website" 
                type="url"
                placeholder="https://votrelabel.com"
              />
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description du Label</label>
              <textarea 
                id="description" 
                v-model="description" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Parlez-nous de votre label et de ce qui le rend unique..."
              ></textarea>
            </div>
          </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Critères d'Artistes</CardTitle>
            <CardDescription>Sélectionnez les critères les plus importants lors de la signature de nouveaux artistes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Préférences de Genre</label>
              <div class="flex flex-wrap gap-2">
                <Button 
                  v-for="genre in genres" 
                  :key="genre"
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="toggleSelection(genrePreferences, genre)"
                  :class="[
                    'rounded-full',
                    genrePreferences.includes(genre) 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 border' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                  ]"
                >
                  {{ genre }}
                </Button>
              </div>
            </div>
            
            <!-- Taille d'Audience -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Taille d'Audience Préférée</label>
              <div class="flex flex-wrap gap-2">
                <Button 
                  v-for="size in audienceSizes" 
                  :key="size"
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="toggleSelection(audienceSize, size)"
                  :class="[
                    'rounded-full',
                    audienceSize.includes(size) 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 border' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                  ]"
                >
                  {{ size }}
                </Button>
              </div>
            </div>
            
            <!-- Expérience d'Artiste -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Niveau d'Expérience Artiste</label>
              <div class="flex flex-wrap gap-2">
                <Button 
                  v-for="level in experienceLevels" 
                  :key="level"
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="toggleSelection(artistExperience, level)"
                  :class="[
                    'rounded-full',
                    artistExperience.includes(level) 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 border' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                  ]"
                >
                  {{ level }}
                </Button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Régions de Marché Cibles</label>
              <div class="flex flex-wrap gap-2">
                <Button 
                  v-for="region in regions" 
                  :key="region"
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="toggleSelection(marketRegions, region)"
                  :class="[
                    'rounded-full',
                    marketRegions.includes(region) 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 border' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                  ]"
                >
                  {{ region }}
                </Button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fourchette de Budget d'Investissement</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <Button 
                  v-for="range in budgetRanges" 
                  :key="range"
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="budgetRange = budgetRange === range ? null : range"
                  :class="[
                    'rounded-md',
                    budgetRange === range 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 border' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                  ]"
                >
                  {{ range }}
                </Button>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-end">
          <Button 
            type="button" 
            variant="outline"
            @click="$router.push('/')"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="default"
            class="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
            <span v-else>Inscrire le Label</span>
          </Button>
        </div>
        
        <Card v-if="errorMessage" class="bg-red-50 border-red-200 mb-6">
          <CardContent class="pt-4">
            <p class="text-red-700">{{ errorMessage }}</p>
          </CardContent>
        </Card>
      </form>
    </div>
  </div>
</template>