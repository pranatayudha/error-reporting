/* eslint-disable vue/return-in-computed-property */
<template>
  <v-container>
    <v-card style="border-radius:10px;" class="pa-3 ma-2 mt-3">
      <v-toolbar dark flat>
        <v-toolbar-title class="mx-auto"
          >Histories Messages Error List</v-toolbar-title
        >

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            centered
            slider-color="orange"
            background-color="transparent"
          >
            <v-tab
              v-for="title in titles"
              :key="title"
              @click="gettitle(title)"
            >
              {{ title }}
              <span v-if="title == 'All Issue'" v-text="countAll" />
              <span v-if="title == 'HAWK-ID'" v-text="countHawkID" />
              <span v-if="title == 'HAWK-AU'" v-text="countHawkAU" />
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card class="mx-auto" v-if="isFetched" min-height="120px">
            <!-- <v-list three-line class="py-0">
              <v-list-group
                v-for="item in AllData"
                :key="item.id"
                @click="openTimeline(item)"
              >
                <template v-slot:activator>
                  <v-list-item active-class="blue">
                    <v-list-item-avatar color="orange" size="36">
                      <span class="white--text title mx-auto">
                        {{ item.count }}
                      </span>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.project + "#" + item.id }}
                        <v-chip
                          class="ma-2"
                          small
                          color="green"
                          outlined
                          v-if="item.priority == 1"
                        >
                          Normal
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.priority == 2"
                        >
                          High
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="orange"
                          outlined
                          v-if="item.priority == 0"
                        >
                          Low
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="primary"
                          outlined
                          v-if="item.status == 0"
                        >
                          Open
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="grey"
                          outlined
                          v-if="item.status == 3 && !item.user"
                        >
                          Closed by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="grey"
                          outlined
                          v-if="item.status == 3 && item.user"
                        >
                          Closed by Fanny
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.status == 4 && !item.user"
                        >
                          Ignored by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.status == 4 && item.user"
                        >
                          Ignored by {{ item.user.name }}
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="warning"
                          outlined
                          v-if="item.status == 1 && !item.user"
                        >
                          Pending by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="warning"
                          outlined
                          v-if="item.status == 1 && item.user"
                        >
                          Pending by {{ item.user.name }}
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="purple"
                          outlined
                          v-if="item.status == 2 && !item.user"
                        >
                          Checking by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="purple"
                          outlined
                          v-if="item.status == 2 && item.user"
                        >
                          Checking by {{ item.user.name }}
                        </v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle
                        v-html="item.title"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mb-2"></v-divider>
                </template>
                <v-list-item>
                  <v-card elevation="0" outlined min-width="100%">
                    <v-card-text class="mr-3 pl-2">
                      <div class="text-lg-left" v-if="item.user">
                        <b>Assignee : </b> {{ item.user.name }}
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 2">
                        <b>Priority : </b> High
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 1">
                        <b>Priority : </b> Normal
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 0">
                        <b>Priority : </b> Low
                      </div>
                      <div class="text-lg-left">
                        <b>Last Occured : </b> {{ date(item.last_occured) }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>User info : </b> {{ item.content_obj.userdata }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>Formatted : </b> {{ item.content_obj.formatted }}
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content_obj"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content_obj.trace }}</pre>
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content }}</pre>
                      </div>
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-subtitle v-if="histories.length">
                      Recent Updates</v-card-subtitle
                    >
                    <v-timeline
                      :dense="dense"
                      class="mr-3 mb-2"
                      v-if="histories.length"
                    >
                      <v-timeline-item
                        :fill-dot="fillDot"
                        :icon="icon ? 'mdi-account' : ''"
                        :right="right"
                        small
                        v-for="history in histories"
                        :key="history.id"
                      >
                        <v-card class="elevation-2 mr-2">
                          <v-card-text>
                            {{ formatDesc(history) }} on
                            {{ date(history.created_at) }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </v-list-item>
                <v-divider class="mt-2"> </v-divider>
              </v-list-group>
            </v-list> -->
            <v-toolbar flat dark class="white--text">
              <v-text-field
                class="mx-4"
                clearable
                flat
                dense
                hide-details
                label="Search by title"
                color="grey"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
              >
              </v-text-field>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="AllData"
              :single-expand="true"
              :expanded="expanded"
              item-key="id"
              show-expand
              class="elevation-1"
              @item-expanded="openTimeline"
            >
              <template v-slot:item.index="{ item }">
                <v-list-item-avatar color="orange" size="36" class="mt-5">
                  <span class="white--text title mx-auto">
                    {{ AllData.indexOf(item) + 1 }}
                  </span>
                </v-list-item-avatar>
              </template>

              <template v-slot:item.project="{ item }">
                <span
                  class="font-weight-bold"
                  v-if="
                    item.status == 0 || item.status == 1 || item.status == 2
                  "
                  >{{ item.project + "#" + item.id }}</span
                >
                <span
                  class="font-weight-light"
                  v-if="item.status == 3 || item.status == 4"
                  >{{ item.project + "#" + item.id }}</span
                >
              </template>

              <template v-slot:item.priority="{ item }">
                <v-chip
                  class="ma-2"
                  small
                  color="green"
                  outlined
                  v-if="item.priority == 1"
                >
                  Normal
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="red"
                  outlined
                  v-if="item.priority == 2"
                >
                  High
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="orange"
                  outlined
                  v-if="item.priority == 0"
                >
                  Low
                </v-chip>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  class="ma-2"
                  small
                  color="grey"
                  outlined
                  v-if="item.status == 3 && !item.user"
                >
                  Closed by System
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="grey"
                  outlined
                  v-if="item.status == 3 && item.user"
                >
                  Closed by Fanny
                </v-chip>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" style="background-color: white">
                  <!-- <v-card elevation="0" outlined min-width="100%" v-if="loadClick">
                <v-skeleton-loader type="article"> </v-skeleton-loader>
              </v-card> -->
                  <v-card width="100%" elevation="0">
                    <v-card-text class="mr-3 pl-2">
                      <div class="text-lg-left" v-if="item.user">
                        <b>Assignee : </b> {{ item.user.name }}
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 2">
                        <b>Priority : </b> High
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 1">
                        <b>Priority : </b> Normal
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 0">
                        <b>Priority : </b> Low
                      </div>
                      <div class="text-lg-left">
                        <b>Created At : </b> {{ date(item.created_at) }}
                      </div>
                      <div class="text-lg-left">
                        <b>Last Occured : </b> {{ date(item.last_occured) }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>User info : </b> {{ item.content_obj.userdata }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>Formatted : </b> {{ item.content_obj.formatted }}
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content_obj"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content_obj.trace }}</pre>
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content }}</pre>
                      </div>
                      <div class="text-lg-left" v-if="isController">
                        <b>Committer : </b> {{ committerName }}
                      </div>
                      <div class="text-lg-left" v-if="isAssets">
                        <b>Committer : </b> {{ committerName }}
                      </div>
                      <div class="text-lg-left" v-else>
                        <b>Committer : </b> Dwiky Ramadhan
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle v-if="histories.length">
                      Recent Updates</v-card-subtitle
                    >
                    <v-timeline
                      :dense="dense"
                      class="mr-3 mb-2"
                      v-if="histories.length"
                    >
                      <v-timeline-item
                        :fill-dot="fillDot"
                        :icon="icon ? 'mdi-account' : ''"
                        :right="right"
                        small
                        v-for="history in histories"
                        :key="history.id"
                      >
                        <v-card class="elevation-2 mr-2">
                          <v-card-text>
                            {{ formatDesc(history) }} on
                            {{ date(history.created_at) }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </td>
              </template>
            </v-data-table>
            <!--<v-alert class="mx-3 mb-3" v-if="!AllData.length" type="error">
              There's no data
            </v-alert>-->
          </v-card>
          <v-card v-if="isLoading">
            <v-skeleton-loader
              class="mx-auto"
              type="acticle, card-heading, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
            ></v-skeleton-loader>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="mx-auto" v-if="isFetched" min-height="120px">
            <!-- <v-list three-line class="py-0">
              <v-list-group
                v-for="item in HawkID"
                :key="item.id"
                @click="openTimeline(item)"
              >
                <template v-slot:activator>
                  <v-list-item
                    v-if="item.project == 'Hawk-ID'"
                    active-class="blue"
                  >
                    <v-list-item-avatar color="orange" size="36">
                      <span class="white--text title mx-auto">
                        {{ item.count }}
                      </span>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.project + "#" + item.id }}
                        <v-chip
                          class="ma-2"
                          small
                          color="green"
                          outlined
                          v-if="item.priority == 1"
                        >
                          Normal
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.priority == 2"
                        >
                          High
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="orange"
                          outlined
                          v-if="item.priority == 0"
                        >
                          Low
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="primary"
                          outlined
                          v-if="item.status == 0"
                        >
                          Open
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="grey"
                          outlined
                          v-if="item.status == 3 && !item.user"
                        >
                          Closed by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="grey"
                          outlined
                          v-if="item.status == 3 && item.user"
                        >
                          Closed by Fanny
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.status == 4 && !item.user"
                        >
                          Ignored by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.status == 4 && item.user"
                        >
                          Ignored by {{ item.user.name }}
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="warning"
                          outlined
                          v-if="item.status == 1 && !item.user"
                        >
                          Pending by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="warning"
                          outlined
                          v-if="item.status == 1 && item.user"
                        >
                          Pending by {{ item.user.name }}
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="purple"
                          outlined
                          v-if="item.status == 2 && !item.user"
                        >
                          Checking by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="purple"
                          outlined
                          v-if="item.status == 2 && item.user"
                        >
                          Checking by {{ item.user.name }}
                        </v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle
                        v-html="item.title"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mb-2"></v-divider>
                </template>
                <v-list-item>
                  <v-card elevation="0" outlined min-width="100%">
                    <v-card-text class="mr-3 pl-2">
                      <div class="text-lg-left" v-if="item.user">
                        <b>Assignee : </b> {{ item.user.name }}
                      </div>
                      <div class="text-lg-left">
                        <b>Last Occured : </b> {{ date(item.last_occured) }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>User info : </b> {{ item.content_obj.userdata }}
                      </div>
                      <div class="text-lg-left" v-else-if="!item.content_obj">
                        <b>User info : </b> -
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>Formatted : </b> {{ item.content_obj.formatted }}
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content_obj"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content_obj.trace }}</pre>
                      </div>
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-subtitle v-if="histories.length">
                      Recent Updates</v-card-subtitle
                    >
                    <v-timeline
                      :dense="dense"
                      class="mr-3 mb-2"
                      v-if="histories.length"
                    >
                      <v-timeline-item
                        :fill-dot="fillDot"
                        :icon="icon ? 'mdi-account' : ''"
                        :right="right"
                        small
                        v-for="history in histories"
                        :key="history.id"
                      >
                        <v-card class="elevation-2 mr-2">
                          <v-card-text>
                            {{ formatDesc(history) }} on
                            {{ date(history.created_at) }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </v-list-item>
                <v-divider class="mt-2"> </v-divider>
              </v-list-group>
            </v-list> -->
            <v-toolbar flat dark class="white--text">
              <v-text-field
                class="mx-4"
                clearable
                flat
                dense
                hide-details
                label="Search by title"
                color="grey"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
              >
              </v-text-field>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="HawkID"
              :single-expand="true"
              :expanded="expanded"
              item-key="id"
              show-expand
              class="elevation-1"
              @item-expanded="openTimeline"
            >
              <template v-slot:item.count="{ item }">
                <v-list-item-avatar color="orange" size="36" class="mt-5">
                  <span class="white--text title mx-auto">
                    {{ item.count }}
                  </span>
                </v-list-item-avatar>
              </template>

              <template v-slot:item.project="{ item }">
                <span
                  class="font-weight-bold"
                  v-if="
                    item.status == 0 || item.status == 1 || item.status == 2
                  "
                  >{{ item.project + "#" + item.id }}</span
                >
                <span
                  class="font-weight-light"
                  v-if="item.status == 3 || item.status == 4"
                  >{{ item.project + "#" + item.id }}</span
                >
              </template>

              <template v-slot:item.priority="{ item }">
                <v-chip
                  class="ma-2"
                  small
                  color="green"
                  outlined
                  v-if="item.priority == 1"
                >
                  Normal
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="red"
                  outlined
                  v-if="item.priority == 2"
                >
                  High
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="orange"
                  outlined
                  v-if="item.priority == 0"
                >
                  Low
                </v-chip>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  class="ma-2"
                  small
                  color="grey"
                  outlined
                  v-if="item.status == 3 && !item.user"
                >
                  Closed by System
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="grey"
                  outlined
                  v-if="item.status == 3 && item.user"
                >
                  Closed by Fanny
                </v-chip>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" style="background-color: white">
                  <!-- <v-card elevation="0" outlined min-width="100%" v-if="loadClick">
                <v-skeleton-loader type="article"> </v-skeleton-loader>
              </v-card> -->
                  <v-card width="100%" elevation="0">
                    <v-card-text class="mr-3 pl-2">
                      <div class="text-lg-left" v-if="item.user">
                        <b>Assignee : </b> {{ item.user.name }}
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 2">
                        <b>Priority : </b> High
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 1">
                        <b>Priority : </b> Normal
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 0">
                        <b>Priority : </b> Low
                      </div>
                      <div class="text-lg-left">
                        <b>Created At : </b> {{ date(item.created_at) }}
                      </div>
                      <div class="text-lg-left">
                        <b>Last Occured : </b> {{ date(item.last_occured) }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>User info : </b> {{ item.content_obj.userdata }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>Formatted : </b> {{ item.content_obj.formatted }}
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content_obj"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content_obj.trace }}</pre>
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content }}</pre>
                      </div>
                      <div class="text-lg-left">
                        <b>Committer : </b> {{ committerName }}
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle v-if="histories.length">
                      Recent Updates</v-card-subtitle
                    >
                    <v-timeline
                      :dense="dense"
                      class="mr-3 mb-2"
                      v-if="histories.length"
                    >
                      <v-timeline-item
                        :fill-dot="fillDot"
                        :icon="icon ? 'mdi-account' : ''"
                        :right="right"
                        small
                        v-for="history in histories"
                        :key="history.id"
                      >
                        <v-card class="elevation-2 mr-2">
                          <v-card-text>
                            {{ formatDesc(history) }} on
                            {{ date(history.created_at) }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </td>
              </template>
            </v-data-table>
            <!--<v-alert class="mx-3 mb-3" v-if="!HawkID.length" type="error">
              There's no data
            </v-alert>-->
          </v-card>
          <v-card v-if="isLoading">
            <v-skeleton-loader
              class="mx-auto"
              type="acticle, card-heading, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
            ></v-skeleton-loader>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="mx-auto" v-if="isFetched" min-height="120px">
            <!-- <v-list three-line class="py-0">
              <v-list-group
                v-for="item in HawkAU"
                :key="item.id"
                @click="openTimeline(item)"
              >
                <template v-slot:activator>
                  <v-list-item
                    v-if="item.project == 'Hawk-AU'"
                    active-class="blue"
                  >
                    <v-list-item-avatar color="orange" size="36">
                      <span class="white--text title mx-auto">
                        {{ item.count }}
                      </span>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.project + "#" + item.id }}
                        <v-chip
                          class="ma-2"
                          small
                          color="green"
                          outlined
                          v-if="item.priority == 1"
                        >
                          Normal
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.priority == 2"
                        >
                          High
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="orange"
                          outlined
                          v-if="item.priority == 0"
                        >
                          Low
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="primary"
                          outlined
                          v-if="item.status == 0"
                        >
                          Open
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="grey"
                          outlined
                          v-if="item.status == 3 && !item.user"
                        >
                          Closed by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="grey"
                          outlined
                          v-if="item.status == 3 && item.user"
                        >
                          Closed by Fanny
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.status == 4 && !item.user"
                        >
                          Ignored by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="red"
                          outlined
                          v-if="item.status == 4 && item.user"
                        >
                          Ignored by {{ item.user.name }}
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="warning"
                          outlined
                          v-if="item.status == 1 && !item.user"
                        >
                          Pending by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="warning"
                          outlined
                          v-if="item.status == 1 && item.user"
                        >
                          Pending by {{ item.user.name }}
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="purple"
                          outlined
                          v-if="item.status == 2 && !item.user"
                        >
                          Checking by System
                        </v-chip>
                        <v-chip
                          class="ma-2"
                          small
                          color="purple"
                          outlined
                          v-if="item.status == 2 && item.user"
                        >
                          Checking by {{ item.user.name }}
                        </v-chip>
                      </v-list-item-title>
                      <v-list-item-subtitle
                        v-html="item.title"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mb-2"></v-divider>
                </template>
                <v-list-item>
                  <v-card elevation="0" outlined min-width="100%">
                    <v-card-text class="mr-3 pl-2">
                      <div class="text-lg-left" v-if="item.user">
                        <b>Assignee : </b> {{ item.user.name }}
                      </div>
                      <div class="text-lg-left">
                        <b>Last Occured : </b> {{ date(item.last_occured) }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>User info : </b> {{ item.content_obj.userdata }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>Formatted : </b> {{ item.content_obj.formatted }}
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content_obj"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content_obj.trace }}</pre>
                      </div>
                    </v-card-text>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-subtitle v-if="histories.length">
                      Recent Updates</v-card-subtitle
                    >
                    <v-timeline
                      :dense="dense"
                      class="mr-3 mb-2"
                      v-if="histories.length"
                    >
                      <v-timeline-item
                        :fill-dot="fillDot"
                        :icon="icon ? 'mdi-account' : ''"
                        :right="right"
                        small
                        v-for="history in histories"
                        :key="history.id"
                      >
                        <v-card class="elevation-2 mr-2">
                          <v-card-text>
                            {{ formatDesc(history) }} on
                            {{ date(history.created_at) }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </v-list-item>
                <v-divider class="mt-2"> </v-divider>
              </v-list-group>
            </v-list> -->
            <v-toolbar flat dark class="white--text">
              <v-text-field
                class="mx-4"
                clearable
                flat
                dense
                hide-details
                label="Search by title"
                color="grey"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
              >
              </v-text-field>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="HawkAU"
              :single-expand="true"
              :expanded="expanded"
              item-key="id"
              show-expand
              class="elevation-1"
              @item-expanded="openTimeline"
            >
              <template v-slot:item.count="{ item }">
                <v-list-item-avatar color="orange" size="36" class="mt-5">
                  <span class="white--text title mx-auto">
                    {{ item.count }}
                  </span>
                </v-list-item-avatar>
              </template>

              <template v-slot:item.project="{ item }">
                <span
                  class="font-weight-bold"
                  v-if="
                    item.status == 0 || item.status == 1 || item.status == 2
                  "
                  >{{ item.project + "#" + item.id }}</span
                >
                <span
                  class="font-weight-light"
                  v-if="item.status == 3 || item.status == 4"
                  >{{ item.project + "#" + item.id }}</span
                >
              </template>

              <template v-slot:item.priority="{ item }">
                <v-chip
                  class="ma-2"
                  small
                  color="green"
                  outlined
                  v-if="item.priority == 1"
                >
                  Normal
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="red"
                  outlined
                  v-if="item.priority == 2"
                >
                  High
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="orange"
                  outlined
                  v-if="item.priority == 0"
                >
                  Low
                </v-chip>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  class="ma-2"
                  small
                  color="grey"
                  outlined
                  v-if="item.status == 3 && !item.user"
                >
                  Closed by System
                </v-chip>
                <v-chip
                  class="ma-2"
                  small
                  color="grey"
                  outlined
                  v-if="item.status == 3 && item.user"
                >
                  Closed by Fanny
                </v-chip>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" style="background-color: white">
                  <!-- <v-card elevation="0" outlined min-width="100%" v-if="loadClick">
                <v-skeleton-loader type="article"> </v-skeleton-loader>
              </v-card> -->
                  <v-card width="100%" elevation="0">
                    <v-card-text class="mr-3 pl-2">
                      <div class="text-lg-left" v-if="item.user">
                        <b>Assignee : </b> {{ item.user.name }}
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 2">
                        <b>Priority : </b> High
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 1">
                        <b>Priority : </b> Normal
                      </div>
                      <div class="text-lg-left" v-if="item.priority == 0">
                        <b>Priority : </b> Low
                      </div>
                      <div class="text-lg-left">
                        <b>Created At : </b> {{ date(item.created_at) }}
                      </div>
                      <div class="text-lg-left">
                        <b>Last Occured : </b> {{ date(item.last_occured) }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>User info : </b> {{ item.content_obj.userdata }}
                      </div>
                      <div class="text-lg-left" v-if="item.content_obj">
                        <b>Formatted : </b> {{ item.content_obj.formatted }}
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content_obj"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content_obj.trace }}</pre>
                      </div>
                      <div
                        class="text-lg-left"
                        v-if="item.content"
                        style="overflow-x: scroll"
                      >
                        <b>Stack Trace : </b>
                        <pre>{{ item.content }}</pre>
                      </div>
                      <div class="text-lg-left" v-if="isController">
                        <b>Committer : </b> {{ committerName }}
                      </div>
                      <div class="text-lg-left" v-if="isAssets">
                        <b>Committer : </b> {{ committerName }}
                      </div>
                      <div class="text-lg-left" v-else>
                        <b>Committer : </b> Dwiky Ramadhan
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle v-if="histories.length">
                      Recent Updates</v-card-subtitle
                    >
                    <v-timeline
                      :dense="dense"
                      class="mr-3 mb-2"
                      v-if="histories.length"
                    >
                      <v-timeline-item
                        :fill-dot="fillDot"
                        :icon="icon ? 'mdi-account' : ''"
                        :right="right"
                        small
                        v-for="history in histories"
                        :key="history.id"
                      >
                        <v-card class="elevation-2 mr-2">
                          <v-card-text>
                            {{ formatDesc(history) }} on
                            {{ date(history.created_at) }}
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </td>
              </template>
            </v-data-table>
          </v-card>
          <v-card v-if="isLoading">
            <v-skeleton-loader
              class="mx-auto"
              type="acticle, card-heading, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
            ></v-skeleton-loader>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
const store = require("store");

import moment from "moment";
import axios from "axios";

export default {
  data: () => ({
    responsive: false,
    getAllMessages: null,
    getServerList: [],
    tab: null,
    search: "",
    titles: ["All Issue", "HAWK-ID", "HAWK-AU"],
    dense: true,
    fillDot: true,
    loadCheking: false,
    loadPending: false,
    loadClosed: false,
    loadIgnored: false,
    loadReopen: false,
    loader: null,
    alert: false,
    assignee: false,
    loadAssign: false,
    selectAssigne: "",
    icon: true,
    right: true,
    histories: [],
    headers: [
      {
        text: "No",
        value: "index",
        align: "left",
      },
      {
        text: "Project",
        value: "project",
        align: "left",
      },
      {
        text: "Priority",
        value: "priority",
        align: "left",
      },
      {
        text: "Status",
        value: "status",
        align: "left",
      },
      { text: "", value: "data-table-expand" },
    ],
    expanded: [],
    committerName: "Dwiky Ramadhan",
    isController: false,
    isAssets: false,
  }),
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 2000);

      this.loader = null;
    },
  },
  methods: {
    getBlame(formatted) {
      let parser = document.createElement("a");
      parser.href = formatted;
      let split = parser.pathname.split("/");

      if (split[1] === "index.php") {
        this.committerName = "";
        let split2 = parser.pathname.split("/index.php/");
        let split3 = split2[1].split("/");
        let split4 = split3[0].split(":");
        let encodeUri = encodeURIComponent(`controllers/${split4[0]}.php`);

        return axios
          .get(
            `${process.env.VUE_APP_GITLAB_URL}/2/repository/files/${encodeUri}/blame?ref=develop`,
            {
              headers: {
                "PRIVATE-TOKEN": "UMQUfzQhhFxoFBJhxc5d",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers":
                  "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
                "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
              },
              crossdomain: true,
            }
          )
          .then((response) => {
            // console.log(response);
            if (response !== null) {
              const committedDate = response.data.map((d) =>
                moment(d.commit.committed_date)
              );
              const getMax = moment.max(committedDate);
              response.data.map((d) => {
                if (
                  moment(d.commit.committed_date)
                    .toDate()
                    .toString() === getMax.toDate().toString()
                ) {
                  if (
                    d.commit.committer_name == "Rizjami Putera" ||
                    d.commit.committer_name == "Syafdia Okta" ||
                    d.commit.committer_name == "okta" ||
                    d.commit.committer_name == "putera" ||
                    d.commit.committer_name == "Rukanda Faridsi"
                  ) {
                    console.log(1);
                    this.committerName = "Dwiky Ramadhan";
                  } else {
                    console.log(2);
                    this.committerName = d.commit.committer_name;
                  }
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (split[1] === "assets") {
        this.committerName = "";
        let split2 = parser.pathname.split("/assets/");
        let encodeUri = encodeURIComponent(`assets/${split2[1]}`);

        return axios
          .get(
            `${process.env.VUE_APP_GITLAB_URL}/2/repository/files/${encodeUri}/blame?ref=develop`,
            {
              headers: {
                "PRIVATE-TOKEN": "UMQUfzQhhFxoFBJhxc5d",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers":
                  "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
                "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
              },
              crossdomain: true,
            }
          )
          .then((response) => {
            // console.log(response);
            if (response !== null) {
              const committedDate = response.data.map((d) =>
                moment(d.commit.committed_date)
              );
              const getMax = moment.max(committedDate);
              response.data.map((d) => {
                if (
                  moment(d.commit.committed_date)
                    .toDate()
                    .toString() === getMax.toDate().toString()
                ) {
                  if (
                    d.commit.committer_name == "Rizjami Putera" ||
                    d.commit.committer_name == "Syafdia Okta" ||
                    d.commit.committer_name == "okta" ||
                    d.commit.committer_name == "putera" ||
                    d.commit.committer_name == "Rukanda Faridsi"
                  ) {
                    console.log(1);
                    this.committerName = "Dwiky Ramadhan";
                  } else {
                    console.log(2);
                    this.committerName = d.commit.committer_name;
                  }
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.committerName = "Dwiky Ramadhan";
      }
    },
    date: (date) => {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    formatDesc: (history) => {
      return history.description;
    },
    openTimeline(item) {
      const messages_id = item.item.id;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}/histories/${messages_id}`)
        .then((response) => {
          this.histories = response.data;
        });
      if (item.item.content_obj) {
        this.getBlame(item.item.content_obj.formatted);
      }
    },
    checkingIssue(item) {
      this.loader = "loadCheking";
      const id = item.id;
      const status = 2;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    reopenIssue(item) {
      this.loader = "loadReopen";
      const id = item.id;
      const status = 0;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    pendingIssue(item) {
      this.loader = "loadPending";
      const id = item.id;
      const status = 1;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    closedIssue(item) {
      this.loader = "loadClosed";
      const id = item.id;
      const status = 3;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    ignoredIssue(item) {
      this.loader = "loadIgnored";
      const id = item.id;
      const status = 4;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    isAlert(item) {
      const dataUser = this.$store.getters.getUsers.find(
        (user) => user.id == store.get("userData").id
      );
      if (dataUser) {
        if (dataUser.role == "developer" && item.status == 0) {
          this.alert = true;
          return this.isAlert;
        }
      }
    },
    isAssigne() {
      const dataUser = this.$store.getters.getUsers.find(
        (user) => user.id == store.get("userData").id
      );
      if (dataUser) {
        if (
          dataUser.role == "system" ||
          dataUser.role == "admin" ||
          dataUser.role == "reporter"
        ) {
          this.assignee = true;
          return this.assignee;
        }
      }
    },
    assignUser(item) {
      this.loader = "loadAssign";
      const id = item.id;
      const status = item.status;
      const user_id = this.selectAssigne;
      const act_user = user_id;
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
      this.selectAssigne = "";
    },
  },
  computed: {
    getHistoriesData() {
      const dataDetail = this.$store.getters.getStatus;
      return dataDetail;
    },
    listHawkIDAU() {
      return this.getHistoriesData.filter((data) => {
        let title = data.title.split(" ");
        // let test = this.getDetailData.filter((data) => data.project == "Hawk-ID" || data.project == "Hawk-AU" && data.content_type == "json" && title[0] != "E_WARNING:")
        // console.log(test);
        return (
          (data.project == "Hawk-ID" || data.project == "Hawk-AU") &&
          data.content_type == "json" &&
          title[0] != "E_WARNING:"
        );
      });
    },
    loadStatus() {
      return this.$store.getters.loadStatus;
    },
    isLoading() {
      return this.loadStatus == "LOADING";
    },
    isFetched() {
      return this.loadStatus == "LOADED";
    },
    listHawkID() {
      return this.listHawkIDAU.filter((data) => data.project == "Hawk-ID");
    },
    listHawkAU() {
      return this.listHawkIDAU.filter((data) => data.project == "Hawk-AU");
    },
    countHawkAU() {
      const datas = this.listHawkIDAU.filter(
        (data) => data.project == "Hawk-AU"
      ).length;
      const data = " (" + datas + ")";
      return data;
    },
    countHawkID() {
      const datas = this.listHawkIDAU.filter(
        (data) => data.project == "Hawk-ID"
      ).length;
      const data = " (" + datas + ")";
      return data;
    },
    countAll() {
      const datas = this.listHawkIDAU.length;
      const data = " (" + datas + ")";
      return data;
    },
    listUsers() {
      const listUser = this.$store.getters.getUsers;
      return listUser;
    },
    HawkID() {
      var data = [];
      if (!this.search) {
        data = this.listHawkID;
      } else {
        const search = this.search.toLowerCase();
        return this.listHawkID.filter((item) => {
          const matchID = item.title;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;
          return matchName;
        });
      }

      return data;
    },
    HawkAU() {
      var data = [];
      if (!this.search) {
        data = this.listHawkAU;
      } else {
        const search = this.search.toLowerCase();
        return this.listHawkAU.filter((item) => {
          const matchID = item.title;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;
          return matchName;
        });
      }

      return data;
    },
    AllData() {
      var data = [];
      if (!this.search) {
        data = this.listHawkIDAU;
      } else {
        const search = this.search.toLowerCase();
        return this.listHawkIDAU.filter((item) => {
          const matchID = item.title;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;
          return matchName;
        });
      }
      return data;
    },
  },
  created() {
    this.$store.dispatch("LOAD_GET_STATUS_DATA");
    this.$store.dispatch("LOAD_USERS_DATA");
  },
};
</script>
<style lang="css" scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
  border-radius: 14px;
}
.text-class {
  top: -10px;
}
.text-offset {
  bottom: -24px;
}
.icon-clas {
  top: -15px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
