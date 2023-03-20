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
                                    Adicionar</button>
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
                                                        v-b-modal.modalProduct @click="openModalEdit(product)"><i
                                                            class="icofont-pencil-alt-2"></i></button>
                                                    <button class="btn btn-danger mx-1 my-1" title="Excluir"
                                                        @click="deleteProduct(product)"><i
                                                            class="icofont-trash"></i></button>
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

            await createProduct(this.product);
            this.getProducts();
            this.$bvModal.hide('modalProduct')
            this.loading = false;
        },

        async updateProduct() {
            this.loading = true;
            delete this.product.category
            delete this.product.createdAt
            delete this.product.updatedAt
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
