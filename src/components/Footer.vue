<template>
  <v-card>
    <v-footer
      class="font-weight-medium"
      inset
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <span class="font-weight-light copyright">
        &copy;
        {{ (new Date()).getFullYear() }}
        <a
            href="http://www.intimap.com/"
            target="_blank"
            color="black"
        >Creative Tim</a>, made with
        <v-icon
            color="tertiary"
            size="17"
        >mdi-heart</v-icon>
        for a better web
        </span>
      </v-col>
    </v-footer>
  </v-card>
</template>