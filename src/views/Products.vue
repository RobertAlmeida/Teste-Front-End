<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="header-top">
                                <h5 class="m-0">PRODUTOS</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-right p-2">
                                <button class="btn btn-primary" v-b-modal.modalProduct @click="openModalNew">
                                    Adicionar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg></button>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Categoria</th>
                                            <th>Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="products.length == 0">
                                            <td colspan="5" class="text-center">Sem dados</td>
                                        </tr>
                                        <tr v-for="product of products" :key="product.id">

                                            <td>{{ product.nome }}</td>
                                            <td>{{ product.descricao }}</td>
                                            <td>{{ validCategory(product) }}</td>
                                            <td>
                                                <div role="group">

                                                    <button class="btn btn-secondary mx-1 my-1" title="Editar"
                                                        v-b-modal.modalProduct @click="openModalEdit(product)"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                            <path
                                                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                        </svg></button>
                                                    <button class="btn btn-danger mx-1 my-1" title="Excluir"
                                                        @click="deleteProduct(product)"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path
                                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd"
                                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="modalProduct" title="Produto" hide-footer size="lg">
            <form>
                <div class="row">
                    <div class="col">
                        <div class="form">
                            <div class="form-group col-md">
                                <label for="inputEmail4">Nome</label>
                                <input type="text" class="form-control" id="inputEmail4" placeholder="Nome"
                                    v-model="product.nome">
                            </div>
                            <div class="form-group col-md">
                                <label for="inputPassword4">Descrição</label>
                                <input type="text" class="form-control" id="inputPassword4" placeholder="Descrição"
                                    v-model="product.descricao">
                            </div>

                            <div class="form-group col-md">
                                <label for="inputEmail5">Categorias</label>
                                <select name="inputEmail5" id="inputEmail5" class="form-control"
                                    v-model="product.id_category">
                                    <option value=""> Sem categoria </option>
                                    <option v-for="category of categorys" :key="category.id" :value="category.id">
                                        {{ category.nome }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <div class="text-center">
                <button v-if="!isEdit" class="btn btn-primary" @click="createProduct">
                    <div v-if="!loading"> <strong>Criar</strong> </div>
                    <b-spinner variant="white" label="Spinning" v-if="loading"></b-spinner>
                </button>
                <button v-if="isEdit" class="btn btn-primary" @click="updateProduct">
                    <div v-if="!loading"> <strong>Salvar</strong> </div>
                    <b-spinner variant="white" label="Spinning" v-if="loading"></b-spinner>
                </button>
            </div>
        </b-modal>

    </div>
</template>

<script>

import { getCategory } from "../services/Category";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../services/Product";

export default {
    name: 'Products',
    components: {

    },
    data() {
        return {

            isEdit: false,
            msgError: false,
            loading: false,
            product: {
                id: "",
                nome: "",
                descricao: "",
                id_category: 0,
            },
            categorys: [],
            products: [],

        }
    },
    methods: {


        async getCategorys() {
            let categorys = await getCategory();
            this.categorys = categorys.data;
        },

        async getProducts() {
            let products = await getProduct();
            return this.products = products.data;
        },

        async createProduct() {

            this.loading = true;

            if (this.product.id) {
                delete this.product.id
            }

            if (!this.product.nome || !this.product.descricao) {
                this.loading = false;
                return alert("Preencha nome e descrição!");
            }

            await createProduct({ ...this.product });
            this.getProducts();
            this.$bvModal.hide('modalProduct')
            this.loading = false;
        },

        async updateProduct() {
            this.loading = true;
            delete this.product.category
            delete this.product.createdAt
            delete this.product.updatedAt
            if (!this.product.nome || !this.product.descricao) {
                this.loading = false;
                return alert("Preencha nome e descrição!");
            }
            await updateProduct(this.product);
            this.getProducts();
            this.$bvModal.hide('modalProduct')
            this.loading = false;
        },

        async deleteProduct(product) {

            await deleteProduct(product)
                .catch(e => {
                    this.msgError = true;
                    this.loading = false;
                })
                .then(e => {
                    this.loading = false;
                    this.msgError = false;
                    this.getProducts();

                })


        },

        openModalEdit(product) {
            this.isEdit = true;
            this.product = product;
        },

        openModalNew() {
            this.isEdit = false;
            this.product = {
                id: "",
                nome: "",
                descricao: "",
                id_category: 0,
            }
        },

        validCategory(product) {

            let returnData = "Sem categoria";

            if (product.hasOwnProperty('category')) {
                if (product.category) {
                    if (product.category.hasOwnProperty('nome')) {
                        returnData = product.category.nome
                    }
                }
            }

            return returnData;

        },


    },
    mounted() {
        this.getCategorys();
        this.getProducts();
    },

}
</script>
