<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="header-top">
                                <h5 class="m-0">CATEGORIAS</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-right p-2">
                                <button class="btn btn-primary" v-b-modal.modalCategory @click="openModalNew">
                                    Adicionar</button>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="categorys.length == 0">
                                            <td colspan="5" class="text-center">Sem dados</td>
                                        </tr>
                                        <tr v-for="category of categorys" :key="category.id">

                                            <td>{{ category.nome }}</td>
                                            <td>{{ category.descricao }}</td>
                                            <td>
                                                <div role="group">

                                                    <button class="btn btn-secondary mx-1 my-1" title="Editar"
                                                        v-b-modal.modalCategory @click="openModalEdit(category)"><i
                                                            class="icofont-pencil-alt-2"></i></button>
                                                    <button class="btn btn-danger mx-1 my-1" title="Excluir"
                                                        @click="deleteCategorys(category)"><i
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

        <b-modal id="modalCategory" title="Categoria" hide-footer size="lg">
            <form>
                <div class="row">
                    <div class="col">
                        <div class="form">
                            <div class="form-group col-md">
                                <label for="inputEmail4">Nome</label>
                                <input type="text" class="form-control" id="inputEmail4" placeholder="Nome"
                                    v-model="category.nome">
                            </div>
                            <div class="form-group col-md">
                                <label for="inputPassword4">Descrição</label>
                                <input type="text" class="form-control" id="inputPassword4" placeholder="Descrição"
                                    v-model="category.descricao">
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <div class="text-center">
                <button v-if="!isEdit" class="btn btn-primary" @click="createCategory">
                    <div v-if="!loading"> <strong>Criar</strong> </div>
                    <b-spinner variant="white" label="Spinning" v-if="loading"></b-spinner>
                </button>
                <button v-if="isEdit" class="btn btn-primary" @click="updateCategory">
                    <div v-if="!loading"> <strong>Salvar</strong> </div>
                    <b-spinner variant="white" label="Spinning" v-if="loading"></b-spinner>
                </button>
            </div>
        </b-modal>

    </div>
</template>

<script>
import { createCategory, deleteCategory, getCategory, updateCategory } from '../services/Category';

export default {
    name: 'categorys',
    components: {

    },
    data() {
        return {

            isEdit: false,
            msgError: false,
            loading: false,
            category: {
                id: "",
                nome: "",
                descricao: "",
            },
            categorys: [],

        }
    },
    methods: {

        async getCategorys() {
            let categorys = await getCategory();
            return this.categorys = categorys.data;
        },

        async createCategory() {

            this.loading = true;

            if (this.category.id) {
                delete this.category.id
            }

            await createCategory(this.category);
            this.getCategorys();
            this.$bvModal.hide('modalCategory')
            this.loading = false;
        },

        async updateCategory() {
            this.loading = true;
            delete this.category.createdAt
            delete this.category.updatedAt
            await updateCategory(this.category);
     
            this.$bvModal.hide('modalCategory')
            this.loading = false;

        },

        async deleteCategorys(category) {
            await deleteCategory(category).then(e => {this.getCategorys()});
        },

        openModalEdit(category) {
            this.isEdit = true;
            this.category = category;

        },

        openModalNew() {
            this.category = {
                id: "",
                nome: "",
                descricao: "",
            }
            this.isEdit = false;
        },


    },
    async mounted() {
        this.getCategorys();
    },

}
</script>
