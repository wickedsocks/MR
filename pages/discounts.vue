<template>
  <div>
    <breadcrumbs :links="links"></breadcrumbs>
    <h1>Скиди и Акции</h1>
    <div>
      <div>Скидки от суммы заказа:</div>
      <div>- сумма заказа больше 1 000 грн. - скидка -3%</div>
      <div>- сумма заказа больше 2 000 грн. - скидка -5%</div>
      <div>- сумма заказа больше 3 000 грн. - скидка -7%</div>
      <div>- сумма заказа больше 4 000 грн. - скидка -10%</div>
      <div>- сумма заказа больше 5 000 грн. - скидка -12%</div>
      <div>- сумма заказа больше 10 000 грн. - скидка -17%</div>
      <div>- сумма заказа больше 15 000 грн. - скидка -21%</div>
      <div>- сумма заказа больше 20 000 грн. - скидка -27%</div>
      <div>- сумма заказа больше 25 000 грн. - скидка -32%</div>
      <div>- сумма заказа больше 50 000 грн. - скидка -40%</div>
    </div>
    <!-- TODO: rewrite in different words -->
    <div class="mt-5">
      ☑ На ряд товаров процентный размер скидки ограничен. Более точно Вам подскажет менеджер, в дальнейшем мы добавим такую информацию как страницу каждого товара.
      <!-- Предупреждение об ограничении скидки и возможный размер максимальной скидки написаны на страничке каждого товара. -->
    </div>
    <div class="mt-3">
      ☑ Кроме того: - действует скидка -10% на весь ассортимент интернет-магазина при любом заказе.
      - для православных приходов
      - церковных лавок
      - воскресных школ
      - духовенства и членов их семей
    </div>
    <div class="mt-3">
      ☑ Если вы представитель прихода, церковной лавки, монастыря, священник, настоятель и хотите сделать заказ на сумму более 20 000 грн., то наши менеджеры предложат Вам специальные оптовые условия и скидки до -40%
      <!-- то мы предложим для вас специальные оптовые цены или скидки до -40% -->
    </div>
    <div class="mt-3  font-weight-bold">
      При заказе на сумму свыше 50 000 грн. Скидка, условия доставки, оплаты обсуждаются в индивидуальном порядке. 
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      links: [{ url: "/discounts", title: "Скидки и Акции" }],
      name: "",
      email: "",
      tel: "",
      comment: "",
      quantity: "",
      showLoader: "",
      success: "",
      message: "",
      error: ""
    };
  },
  methods: {
    async makeOrder() {
      let valid = await this.$validator.validateAll();
      if (valid) {
        try {
          let regExp = new RegExp(/(\(|\)|\+|-)/g);
          this.tel = this.tel.replace(regExp, "");
          this.showLoader = true;
          await axios.post("/api/contact-us", {
            name: this.name,
            email: this.email,
            tel: this.tel,
            comment: this.comment
          });
          this.showLoader = false;
          this.success = true;
          this.message = "Ваш запрос отправлен, с Вами свяжутся";
          setTimeout(() => {
            this.success = false;
            window.location.href = "/";
          }, 2000);
        } catch (err) {
          this.showLoader = false;
          this.error = true;
          this.message = err;
          setTimeout(() => {
            this.error = false;
          }, 2000);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button,
div,
h4,
span,
input,
p {
  font-family: sans-serif;
  color: #555;
}
.error-default {
  color: red;
  font-size: 12px;
}
.my-btn {
  color: #ffffff;
  outline: none;
  padding: 10px 25px;
}
a {
  color: #555;
}
</style>

