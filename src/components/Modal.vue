<template>
  <section class="modal">
    <v-container fluid>
      <v-row>
        <v-col class="col-12">
          <div class="modal__dialog">
            <div class="modal-work">
              <div class="packages__item packages__item--modal">
                <div
                  class="d-flex align-start justify-space-between flex-wrap flex-column flex-sm-row"
                >
                  <div class="packages-item__name">
                    <span class="packages-item__tag mr-3">Package name:</span
                    >{{ currentPackage.name }}
                  </div>
                  <div class="packages-item__badge packages-item__badge--modal">
                    <span class="packages__item-tag mr-2">version:</span
                    >{{ currentPackage.version }}
                  </div>
                </div>
                <div class="packages-item__description my-2 my-sm-5">
                  {{ currentPackage.description }}
                </div>
                <div
                  class="packages-item__author mb-3"
                  v-if="currentPackage.author"
                >
                  <div v-if="currentPackage.author.name">
                    <span class="packages-item__tag mr-3">Author name:</span
                    >{{ currentPackage.author["name"] }}
                  </div>
                  <div v-if="currentPackage.author.username">
                    <span class="packages-item__tag mr-3">Author username:</span
                    >{{ currentPackage.author["username"] }}
                  </div>
                  <div v-if="currentPackage.author.email">
                    <span class="packages-item__tag mr-3">Author email:</span
                    >{{ currentPackage.author["email"] }}
                  </div>
                </div>
                <div
                  class="packages-item__publisher mb-3"
                  v-if="currentPackage.publisher"
                >
                  <span class="packages-item__tag packages-item__tag--main"
                    >Publisher:</span
                  >
                  <div v-if="currentPackage.publisher">
                    <span class="packages-item__tag mr-3"
                      >Publisher username:</span
                    >{{ currentPackage.publisher["username"] }}
                  </div>
                  <div v-if="currentPackage.publisher">
                    <span class="packages-item__tag mr-3">Publisher email:</span
                    >{{ currentPackage.publisher["email"] }}
                  </div>
                </div>
                <div class="packages__item-maintainers">
                  <span class="packages-item__tag packages-item__tag--main"
                    >Maintainers:</span
                  >
                  <div class="packages-item__maintainers-inner">
                    <div
                      v-for="(maintainer, index) in currentPackage.maintainers"
                      :key="index"
                      class="my-3"
                    >
                      <div v-if="maintainer.name">
                        <span class="packages-item__tag mr-3"
                          >Maintainer name:</span
                        >{{ maintainer.name }}
                      </div>
                      <div v-if="maintainer.username">
                        <span class="packages-item__tag mr-3"
                          >Maintainer username:</span
                        >{{ maintainer.username }}
                      </div>
                      <div v-if="maintainer.email">
                        <span class="packages-item__tag mr-3"
                          >Maintainer email:</span
                        >{{ maintainer.email }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex align-center align-sm-start justify-space-between mt-2 mt-sm-5"
                >
                  <div
                    class="packages-item__keywords packages-item__keywords--modal"
                  >
                    <span
                      class="packages-item__badge"
                      v-for="(keyword, index) in currentPackage.keywords"
                      :key="index"
                      >{{ keyword }}
                    </span>
                  </div>
                  <div
                    class="packages-item__social packages-item__social--modal justify-end"
                  >
                    <a
                      class="packages-item__link"
                      v-for="(link, name) in currentPackage.links"
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
              </div>
            </div>
            <button class="modal__btn-close" @click="toggleModal">
              <v-icon small color="#4D5058">mdi-close</v-icon>
            </button>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { packagesIcons } from "@/data";

export default {
  name: "Modal",

  computed: {
    ...mapState({
      currentPackage: state => state.currentPackage
    })
  },

  methods: {
    ...mapMutations({
      toggleModal: "TOGGLE_MODAL"
    }),

    setPackageIcon(link) {
      return `mdi-${packagesIcons[link]}`;
    }
  }
};
</script>

<style lang="scss">
.modal {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  background: rgb(31 37 45 / 70%);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &__dialog {
    width: 100%;
    max-width: 850px;
    margin: auto;

    border-radius: 8px;
    position: relative;

    background: #ffffff;
  }

  &-work {
    padding: 15px;
  }

  &__btn-close {
    position: absolute;
    right: 5px;
    top: 0;
    z-index: 1;
  }
}
</style>
