<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ArrowLeft, Music, Youtube, Instagram, Twitter } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import artistsData from '@/data/artists.json';

const router = useRouter();
const route = useRoute();

// Artist data from JSON file
const artist = ref<any>(null);
const userVote = ref<'up' | null>(null);
const notFound = ref(false);

// Fetch artist data based on route ID
onMounted(() => {
  const artistId = parseInt(route.params.id as string);
  const foundArtist = artistsData.artists.find(a => a.id === artistId);
  
  if (foundArtist) {
    artist.value = foundArtist;
    // Add default empty socials if not present
    if (!artist.value.socials) {
      artist.value.socials = {
        spotify: "",
        youtube: "",
        soundcloud: "",
        instagram: "",
        twitter: ""
      };
    }
  } else {
    notFound.value = true;
  }
});

// Handle upvote
const handleUpvote = () => {
  if (!artist.value) return;
  
  if (userVote.value === 'up') {
    // Remove upvote
    artist.value.upvotes--;
    userVote.value = null;
  } else {
    artist.value.upvotes++;
    userVote.value = 'up';
  }
};
</script>

<template>
  <div class="p-6 md:p-12 max-w-6xl mx-auto">
    <!-- Back button -->
    <Button 
      variant="ghost" 
      size="sm" 
      class="mb-6" 
      @click="router.push('/')"
    >
      <ArrowLeft class="mr-2" />
      Retour aux Artistes
    </Button>

    <!-- Not found message -->
    <Card v-if="notFound" class="p-8 text-center">
      <CardTitle class="text-2xl mb-4">Artiste Non Trouvé</CardTitle>
      <CardDescription>
        L'artiste que vous recherchez n'existe pas ou a été supprimé.
      </CardDescription>
      <Button class="mt-6" @click="router.push('/')">
        Retour aux Artistes
      </Button>
    </Card>

    <div v-else-if="artist">
      <!-- Artist header -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <!-- Artist image -->
        <div class="md:col-span-1">
          <Card class="overflow-hidden">
            <img :src="artist.image" :alt="artist.name" class="w-full aspect-square object-cover">
          </Card>
        </div>

        <!-- Artist info -->
        <div class="md:col-span-2">
          <CardHeader class="px-0 pt-0">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-3xl font-bold">{{ artist.name }}</CardTitle>
                <CardDescription class="text-lg">{{ artist.genre }}</CardDescription>
              </div>
              
              <!-- Voting buttons -->
              <div class="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  class="rounded-full"
                  :class="{ 'bg-green-100 border-green-500 text-green-600': userVote === 'up' }"
                  @click="handleUpvote"
                >
                  <ThumbsUp />
                  {{ artist.upvotes }}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent class="px-0">

            <!-- Artist bio -->
            <p class="text-gray-700 mb-6">{{ artist.bio }}</p>
            
            <!-- Social Media Links -->
            <div class="flex flex-wrap gap-2 mb-6">
              <a 
                :href="artist.socials.spotify" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1DB954] text-white hover:opacity-90 transition-opacity"
              >
                <Music :size="18" />
              </a>
              <a 
                :href="artist.socials.youtube" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FF0000] text-white hover:opacity-90 transition-opacity"
              >
                <Youtube :size="18" />
              </a>
              <a 
                :href="artist.socials.soundcloud" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FF7700] text-white hover:opacity-90 transition-opacity"
              >
              <img class="invert p-1" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDMwMCAzMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IlhNTElEXzUyNl8iPg0KCTxwYXRoIGlkPSJYTUxJRF81MjdfIiBkPSJNMTQuNDkyLDIwOC44OTZjMC42MTksMCwxLjE0My0wLjUwOSwxLjIzMi0xLjIyNmwzLjM2NS0yNi42NzFsLTMuMzU1LTI3LjI3OA0KCQljLTAuMS0wLjcxNy0wLjYyMy0xLjIzLTEuMjQyLTEuMjNjLTAuNjM1LDAtMS4xNzYsMC41MjQtMS4yNiwxLjIzbC0yLjk0MSwyNy4yNzhsMi45NDEsMjYuNjYyDQoJCUMxMy4zMTYsMjA4LjM3NywxMy44NTcsMjA4Ljg5NiwxNC40OTIsMjA4Ljg5NnoiLz4NCgk8cGF0aCBpZD0iWE1MSURfNTMwXyIgZD0iTTMuMzk3LDE5OC43NTJjMC42MDgsMCwxLjEwMS0wLjQ3MywxLjE5LTEuMThsMi42MDgtMTYuNTc0bC0yLjYwOC0xNi44ODQNCgkJYy0wLjA5LTAuNjg1LTAuNTgyLTEuMTgtMS4xOS0xLjE4Yy0wLjYzNSwwLTEuMTI3LDAuNDk1LTEuMjE3LDEuMTlMMCwxODAuOTk5bDIuMTgsMTYuNTY5DQoJCUMyLjI3LDE5OC4yNjksMi43NjIsMTk4Ljc1MiwzLjM5NywxOTguNzUyeiIvPg0KCTxwYXRoIGlkPSJYTUxJRF81MzFfIiBkPSJNMjcuNzYyLDE0OC42NDRjLTAuMDgtMC44NjctMC43MTUtMS41LTEuNTAzLTEuNWMtMC43ODIsMC0xLjQxOCwwLjYzMy0xLjQ5MSwxLjVsLTIuODExLDMyLjM1NQ0KCQlsMi44MTEsMzEuMTc0YzAuMDczLDAuODYyLDAuNzA5LDEuNDg3LDEuNDkxLDEuNDg3YzAuNzg4LDAsMS40MjMtMC42MjUsMS41MDMtMS40ODdsMy4xOC0zMS4xNzRMMjcuNzYyLDE0OC42NDR6Ii8+DQoJPHBhdGggaWQ9IlhNTElEXzUzMl8iIGQ9Ik0zOC4xNTIsMjE0LjkxNmMwLjkyMiwwLDEuNjY4LTAuNzU5LDEuNzU4LTEuNzUxbDMuMDA1LTMyLjE1NmwtMy4wMDUtMzMuMjU4DQoJCWMtMC4wOS0wLjk5OS0wLjgzNi0xLjc0OS0xLjc1OC0xLjc0OWMtMC45MzUsMC0xLjY5MiwwLjc1MS0xLjc1NiwxLjc1NGwtMi42NTYsMzMuMjUzbDIuNjU2LDMyLjE1Ng0KCQlDMzYuNDYsMjE0LjE1OCwzNy4yMTcsMjE0LjkxNiwzOC4xNTIsMjE0LjkxNnoiLz4NCgk8cGF0aCBpZD0iWE1MSURfNTMzXyIgZD0iTTUwLjEyNywyMTUuNDM4YzEuMDc0LDAsMS45MzYtMC44NiwyLjAyNS0yLjAxMWwtMC4wMSwwLjAwOGwyLjgzLTMyLjQyNmwtMi44My0zMC44NTcNCgkJYy0wLjA4LTEuMTMyLTAuOTQxLTIuMDA1LTIuMDE2LTIuMDA1Yy0xLjA5LDAtMS45NDcsMC44NzMtMi4wMTIsMi4wMTRsLTIuNTAyLDMwLjg0OWwyLjUwMiwzMi40MTgNCgkJQzQ4LjE4LDIxNC41NzgsNDkuMDM3LDIxNS40MzgsNTAuMTI3LDIxNS40Mzh6Ii8+DQoJPHBhdGggaWQ9IlhNTElEXzUzNF8iIGQ9Ik02Ny4xMzIsMTgxLjAxN2wtMi42NTUtNTAuMTcyYy0wLjA3NC0xLjI3Mi0xLjA2NS0yLjI4Ni0yLjI4MS0yLjI4NmMtMS4yMDcsMC0yLjE5NSwxLjAxMy0yLjI2OSwyLjI4Ng0KCQlsLTIuMzUsNTAuMTcybDIuMzUsMzIuNDE4YzAuMDc0LDEuMjc4LDEuMDYzLDIuMjc4LDIuMjY5LDIuMjc4YzEuMjE3LDAsMi4yMDctMSwyLjI4MS0yLjI3OHYwLjAwOUw2Ny4xMzIsMTgxLjAxN3oiLz4NCgk8cGF0aCBpZD0iWE1MSURfNTM1XyIgZD0iTTc0LjM4NiwyMTUuNzY2YzEuMzM5LDAsMi40NS0xLjExMSwyLjUxMy0yLjUyOXYwLjAyMWwyLjQ4Mi0zMi4yMzNsLTIuNDgyLTYxLjY1Ng0KCQljLTAuMDYzLTEuNDE4LTEuMTc0LTIuNTI5LTIuNTEzLTIuNTI5Yy0xLjM3LDAtMi40NzEsMS4xMTEtMi41NDUsMi41MjlsLTIuMTg1LDYxLjY1NmwyLjE5NSwzMi4yMjINCgkJQzcxLjkxNSwyMTQuNjU1LDczLjAxNiwyMTUuNzY2LDc0LjM4NiwyMTUuNzY2eiIvPg0KCTxwYXRoIGlkPSJYTUxJRF81MzZfIiBkPSJNODYuNjQ1LDExMS40MzVjLTEuNTA4LDAtMi43MjUsMS4yMzgtMi43ODcsMi43OTlsLTIuMDMzLDY2LjgwMWwyLjAzMywzMS44ODQNCgkJYzAuMDYzLDEuNTUzLDEuMjc5LDIuNzgzLDIuNzg3LDIuNzgzYzEuNTA0LDAsMi43My0xLjIyLDIuNzgzLTIuNzg4djAuMDE2bDIuMzA3LTMxLjg5NWwtMi4zMDctNjYuODAxDQoJCUM4OS4zNzUsMTEyLjY2Myw4OC4xNDgsMTExLjQzNSw4Ni42NDUsMTExLjQzNXoiLz4NCgk8cGF0aCBpZD0iWE1MSURfNzgyXyIgZD0iTTk5LjAxLDIxNS43NjZjMS42NTYsMCwyLjk3NS0xLjMzNiwzLjAzNy0zLjA1NnYwLjAxOWwyLjEzMy0zMS42OTNsLTIuMTMzLTY5LjA0NQ0KCQljLTAuMDYzLTEuNzE0LTEuMzgxLTMuMDU2LTMuMDM3LTMuMDU2Yy0xLjY2NiwwLTMuMDA1LDEuMzQyLTMuMDMxLDMuMDU2bC0xLjkxNiw2OS4wNDVsMS45MTYsMzEuNjkzDQoJCUM5Ni4wMDUsMjE0LjQzLDk3LjM0NCwyMTUuNzY2LDk5LjAxLDIxNS43NjZ6Ii8+DQoJPHBhdGggaWQ9IlhNTElEXzc4M18iIGQ9Ik0xMTEuNDc3LDIxNS43MzRjMS43ODcsMCwzLjIzNy0xLjQ2MywzLjI5MS0zLjMxOHYwLjAyOWwxLjk2My0zMS40MDRsLTEuOTYzLTY3LjI4OQ0KCQljLTAuMDU0LTEuODU0LTEuNTA0LTMuMzExLTMuMjkxLTMuMzExYy0xLjgsMC0zLjI1LDEuNDU2LTMuMzAzLDMuMzExbC0xLjcyNSw2Ny4yODlsMS43MzYsMzEuMzg5DQoJCUMxMDguMjI3LDIxNC4yNzEsMTA5LjY3NywyMTUuNzM0LDExMS40NzcsMjE1LjczNHoiLz4NCgk8cGF0aCBpZD0iWE1MSURfNzg0XyIgZD0iTTEyOS4zNTksMTgxLjA0MWwtMS43NzctNjQuODM2Yy0wLjA0My0yLTEuNjA5LTMuNTcxLTMuNTUxLTMuNTcxYy0xLjk0NywwLTMuNTE0LDEuNTcxLTMuNTU1LDMuNTg0DQoJCWwtMS41OTQsNjQuODIzbDEuNTk0LDMxLjE5OGMwLjA0MSwxLjk4NCwxLjYwNywzLjU1NiwzLjU1NSwzLjU1NmMxLjk0MSwwLDMuNTA4LTEuNTcyLDMuNTUxLTMuNTg1djAuMDI5TDEyOS4zNTksMTgxLjA0MXoiLz4NCgk8cGF0aCBpZD0iWE1MSURfNzg1XyIgZD0iTTEzNi42ODIsMjE1Ljg1M2MyLjA2NCwwLDMuNzczLTEuNzE3LDMuODA1LTMuODI4djAuMDE3bDEuNjEzLTMwLjk4NGwtMS42MTMtNzcuMTUzDQoJCWMtMC4wMzEtMi4xMTktMS43NC0zLjgzMy0zLjgwNS0zLjgzM2MtMi4wNjMsMC0zLjc2NywxLjcyMi0zLjgwOSwzLjg0NGwtMS40MzQsNzcuMTExbDEuNDM0LDMxLjAxNg0KCQlDMTMyLjkxNSwyMTQuMTM2LDEzNC42MTksMjE1Ljg1MywxMzYuNjgyLDIxNS44NTN6Ii8+DQoJPHBhdGggaWQ9IlhNTElEXzc4Nl8iIGQ9Ik0xNDkuMjkxLDkyLjgxNGMtMi4yMjksMC00LjAzNywxLjg0OS00LjA3NCw0LjEwM2wtMS42NjcsODQuMTUxbDEuNjc3LDMwLjUyNg0KCQljMC4wMjcsMi4yMjUsMS44MzYsNC4wNjgsNC4wNjQsNC4wNjhjMi4xOTUsMCw0LjAzNy0xLjg0NCw0LjA0Ny00LjEwNXYwLjAzN2wxLjgyLTMwLjUyNmwtMS44Mi04NC4xNTENCgkJQzE1My4zMjgsOTQuNjU1LDE1MS40ODYsOTIuODE0LDE0OS4yOTEsOTIuODE0eiIvPg0KCTxwYXRoIGlkPSJYTUxJRF83ODdfIiBkPSJNMTYwLjgyLDIxNS44ODJjMC4wOSwwLjAwOCwxMDEuNjIzLDAuMDU2LDEwMi4yNzUsMC4wNTZjMjAuMzg1LDAsMzYuOTA0LTE2LjcyMiwzNi45MDQtMzcuMzU3DQoJCWMwLTIwLjYyNC0xNi41Mi0zNy4zNDktMzYuOTA0LTM3LjM0OWMtNS4wNTksMC05Ljg3OSwxLjAzNC0xNC4yNzUsMi45MDdjLTIuOTIyLTMzLjY3MS0zMC44MTUtNjAuMDc3LTY0Ljg0Mi02MC4wNzcNCgkJYy04LjMxOCwwLTE2LjQyOSwxLjY2Mi0yMy41OTMsNC40NjljLTIuNzg4LDEuMDktMy41MzQsMi4yMTQtMy41NTYsNC4zOTJ2MTE4LjUzOUMxNTYuODYxLDIxMy43NTIsMTU4LjYwNywyMTUuNjU1LDE2MC44MiwyMTUuODgyDQoJCXoiLz4NCjwvZz4NCjwvc3ZnPg==" />
              </a>
              <a 
                :href="artist.socials.instagram" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#405DE6] via-[#E1306C] to-[#FFDC80] text-white hover:opacity-90 transition-opacity"
              >
                <Instagram :size="18" />
              </a>
              <a 
                :href="artist.socials.twitter" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
              >
                <Twitter :size="18" />
              </a>
            </div>
          </CardContent>
        </div>
      </div>

      <!-- Tracks section -->
      <div>
        <h2 class="text-2xl font-bold mb-4">Titres Populaires</h2>
        <Card>
          <div class="divide-y">
            <div 
              v-for="track in artist.tracks" 
              :key="track.id" 
              class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 class="font-medium">{{ track.title }}</h3>
                <p class="text-sm text-gray-500">{{ track.duration }}</p>
              </div>
              <div class="text-sm text-gray-500">
                {{ track.plays }} écoutes
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  </div>
</template>