<template>
  <div class="container">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün İşlemleri</h3>
          <hr />
          <div class="form-group">
            <label>Ürün Adı</label>
            <input
              type="text"
              v-model="product.title"
              class="form-control"
              placeholder="Ürün adını giriniz.."
            />
          </div>
          <div class="form-group">
            <label>Adet</label>
            <input
              type="number"
              v-model="product.count"
              class="form-control"
              placeholder="Ürün adetini giriniz.."
            />
          </div>
          <div class="form-group">
            <label>Fiyat</label>
            <input
              type="number"
              v-model="product.price"
              class="form-control"
              placeholder="Ürün fiyatı giriniz.."
            />
          </div>
          <div class="form-group">
            <label>Açıklama</label>
            <textarea
              v-model="product.description"
              cols="30"
              rows="5"
              placeholder="Ürüne ait bir açıklama giriniz..."
              class="form-control"
            ></textarea>
          </div>
          <hr />
          <button
            class="btn btn-primary"
            :disabled="saveEnabled"
            @click="saveProduct"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loadingMixin } from "../../loadingMixin";
export default {
  data() {
    return {
      product: {
        title: "",
        count: null,
        price: null,
        description: "",
      },
      saveButtonClick: false,
    };
  },
  mixins: [loadingMixin],
  computed: {
    saveEnabled() {
      if (
        this.product.title.length > 0 &&
        this.product.count > 0 &&
        this.product.price > 0 &&
        this.product.description.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    saveProduct() {
      this.saveButtonClick = true;
      this.loading = true;
      this.$store.dispatch("saveProduct", this.product);
    },
  },

  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    if (
      (this.product.title.length > 0 ||
        this.product.count > 0 ||
        this.product.price > 0 ||
        this.product.description.length > 0) &&
      !this.saveButtonClick
    ) {
      if (
        confirm(
          "Ürün bilgilerini kaydetmeden çıkmak istediğinize emin misiniz?"
        )
      ) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>
