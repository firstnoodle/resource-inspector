<template>
    <div class="ee-data-tag paginator">
        <div
            tabindex="0"
            class="ee-data-tag__button"
            :class="{ 'is-active': previousActive }"
            @click="$store.dispatch(`${storePath}/changePage`, -1)"
            @keydown.enter="previousActive = true"
            @keyup.enter="previousActive = false"
        >
            <i class="el-icon-arrow-left"></i>
        </div>
        <el-input-number
            :value="computedCurrentPage"
            class="ee-data-tag__input paginator__page"
            size="mini"
            ref="current_page_input"
            :controls="false"
            :min="1"
            :max="$store.getters[`${storePath}/last_page`]"
            @change="inputChange"
        >
        </el-input-number>
        <el-select size="mini" class="ee-data-tag__select paginator__per-page" v-model="computedPerPage">
            <el-option
                v-for="option in $store.getters[`${storePath}/perPageOptions`]"
                :key="option.label"
                :label="option.label"
                :value="option"
            >
                <span style="font-size: 13px">{{ option.value + ' per page' }}</span>
            </el-option>
        </el-select>
        <div
            tabindex="0"
            class="ee-data-tag__button"
            :class="{ 'is-active': nextActive }"
            @click="$store.dispatch(`${storePath}/changePage`, 1)"
            @keydown.enter="nextActive = true"
            @keyup.enter="nextActive = false"
        >
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        storePath: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            nextActive: false,
            previousActive: false,
        };
    },
    computed: {
        computedCurrentPage() {
            return this.$store.getters[`${this.storePath}/pagination`].page;
        },
        computedPerPage: {
            get() {
                const last_page = this.$store.getters[`${this.storePath}/pagination`].last_page;
                return last_page ? `of ${last_page}` : 'of ...';
            },
            set(newValue) {
                this.$store.dispatch(`${this.storePath}/changePerPage`, newValue);
            },
        },
    },
    methods: {
        inputChange(value) {
            this.$store.dispatch(`${this.storePath}/setPage`, value);
        },
    },
};
</script>
