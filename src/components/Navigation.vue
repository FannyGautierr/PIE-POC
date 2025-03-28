<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, X, Home, Users, LayoutDashboard, Music } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const router = useRouter();
const isOpen = ref(false);

const closeSheet = () => {
  isOpen.value = false;
};

const navigateTo = (path: string) => {
  router.push(path);
  closeSheet();
};
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 py-1">
    <div class="container flex h-14 items-center">
      <div class="mr-4 flex">
        <router-link to="/" class="flex items-center space-x-2 mr-6" @click="closeSheet">
          <Music class="h-6 w-6" />
          <span class="font-bold">MusicPlatform</span>
        </router-link>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <router-link 
            to="/" 
            class="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground"
            :class="{ 'text-foreground': $route.path === '/' }"
          >
            Découvrir
          </router-link>
          <router-link 
            to="/label-registration" 
            class="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground"
            :class="{ 'text-foreground': $route.path === '/label-registration' }"
          >
            Enregistrer un Label
          </router-link>
          <router-link 
            to="/label-dashboard" 
            class="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground"
            :class="{ 'text-foreground': $route.path === '/label-dashboard' }"
          >
            Espace Label
          </router-link>
        </nav>
      </div>
      <div class="flex flex-1 items-center justify-end space-x-2">
        <div class="md:hidden">
          <Sheet v-model:open="isOpen">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu class="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="pr-0">
              <div class="px-7">
                <router-link to="/" class="flex items-center" @click="closeSheet">
                  <Music class="h-6 w-6 mr-2" />
                  <span class="font-bold">MusicPlatform</span>
                </router-link>
              </div>
              <div class="flex flex-col space-y-3 mt-8">
                <Button 
                  variant="ghost" 
                  class="justify-start pl-7" 
                  :class="{ 'bg-accent': $route.path === '/' }"
                  @click="navigateTo('/')"
                >
                  <Home class="mr-2 h-5 w-5" />
                  Découvrir
                </Button>
                <Button 
                  variant="ghost" 
                  class="justify-start pl-7" 
                  :class="{ 'bg-accent': $route.path === '/label-registration' }"
                  @click="navigateTo('/label-registration')"
                >
                  <Users class="mr-2 h-5 w-5" />
                  Enregistrer un Label
                </Button>
                <Button 
                  variant="ghost" 
                  class="justify-start pl-7" 
                  :class="{ 'bg-accent': $route.path === '/label-dashboard' }"
                  @click="navigateTo('/label-dashboard')"
                >
                  <LayoutDashboard class="mr-2 h-5 w-5" />
                  Espace Label
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </header>
</template>
