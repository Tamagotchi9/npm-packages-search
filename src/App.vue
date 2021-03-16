<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col class="col-12">
            <app-input />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <div class="packages">
              <div
                class="packages-item"
                v-for="(npmPackage, index) in pageOfItems"
                :key="index"
                @click="showCurrentPackage(npmPackage.package)"
              >
                <div class="packages-item__header">
                  <div class="packages-item__info">
                    <div class="packages-item__name">
                      {{ npmPackage.package.name }}
                    </div>
                    <div class="d-flex align-center flex-wrap">
                      <div
                        class="packages-item__owner mr-3"
                        v-if="npmPackage.package.author"
                      >
                        {{ npmPackage.package.author["name"] }}
                      </div>
                      <div class="packages-item__badge">
                        {{ npmPackage.package.version }}
                      </div>
                    </div>
                  </div>
                  <div class="packages-item__social">
                    <a
                      class="packages-item__link"
                      v-for="(link, name) in npmPackage.package.links"
                      :key="name"
                      :href="link"
                      target="_blank"
                    >
                      <v-icon dense color="black">{{
                        setPackageIcon(name)
                      }}</v-icon>
                    </a>
                  </div>
                </div>
                <div class="packages-item__description">
                  {{ npmPackage.package.description }}
                </div>
                <div class="packages-item__keywords">
                  <span
                    class="packages-item__badge"
                    v-for="(keyword, index) in npmPackage.package.keywords"
                    :key="index"
                    >{{ keyword }}
                  </span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12 text-center">
            <jw-pagination
              v-if="packages !== null"
              :pageSize="10"
              :items="packages"
              @changePage="onChangePage"
            ></jw-pagination>
          </v-col>
        </v-row>
      </v-container>
      <Modal v-if="modalStatus" />
    </v-main>
    <v-footer dark>
      <template v-if="author">
        <img class="author-photo" :src="author.avatar_url" alt="" />
        <div>
          <div class="mr-5">{{ author.name }}</div>
          <a href="https://github.com/Tamagotchi9" target="_blank"
            >Github Profile</a
          >
        </div>
      </template>
    </v-footer>
  </v-app>
</template>

<script>
import { packagesIcons } from "@/data";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Modal from "@/components/Modal";
import AppInput from "@/components/AppInput";

export default {
  name: "App",

  data: () => ({
    pageOfItems: []
  }),
  components: {
    Modal,
    AppInput
  },
  computed: {
    ...mapState({
      packages: state => state.packages,
      author: state => state.author
    }),

    ...mapGetters({
      modalStatus: "MODAL_STATUS"
    })
  },
  methods: {
    setPackageIcon(link) {
      return `mdi-${packagesIcons[link]}`;
    },
    ...mapMutations({
      toggleModal: "TOGGLE_MODAL"
    }),

    ...mapActions({
      getAuthor: "GET_AUTHOR",
      showCurrentPackage: "SHOW_CURRENT_PACKAGE"
    }),

    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    }
  },
  mounted() {
    this.getAuthor();
  }
};
</script>

<style lang="scss">
.author-photo {
  margin-right: 25px;
  width: 50px;
  height: auto;
  border-radius: 100%;
}
.packages {
  &-item {
    padding-bottom: 15px;
    border-bottom: 1px solid grey;

    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__social {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    &__link {
      border: 1px solid black;
      text-decoration: none;
      padding: 5px;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    &__tag {
      font-size: 16px;
      font-weight: 400;
      color: darkgrey;

      &--main {
        font-weight: 700;
        color: black;
      }
    }

    &__keywords {
      display: flex;
      flex-wrap: wrap;

      &--modal {
        max-width: 600px;
      }
    }

    &__name {
      margin-bottom: 5px;
      font-size: 25px;
      line-height: 30px;
      font-weight: 700;
    }

    &__badge {
      font-size: 16px;
      font-weight: 500;
      border: 1px solid gray;
      border-radius: 2px;
      padding: 2px 6px;
      margin: 5px;

      &--modal {
        border: 0;
      }
    }

    &__description {
      margin: 20px 0;
      font-size: 18px;
      line-height: 25px;
      color: darkgrey;
    }

    &__maintainers {
      &-inner {
        max-height: 120px;
        overflow-y: scroll;
      }
    }

    &--modal {
      border-bottom: 0;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 600px) {
    &-item {
      &__header {
        flex-direction: column;
      }
      &__owner {
        margin: 10px 0;
      }
      &__social {
        margin-top: 10px;

        &--modal {
        }
      }
      &__link {
        margin: 5px;
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
      &__badge {
        margin: 5px;
      }
    }
  }
}
</style>
