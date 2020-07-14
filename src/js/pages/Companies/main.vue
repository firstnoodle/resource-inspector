<template>
    <main id="content">
        <page-topbar>
            <template #title>Companies</template>
        </page-topbar>
        <pagination :storePath="storePath" />
        <el-select
            v-model="countries"
            multiple
            filterable
            loading-text="Fetching countries..."
            no-data-text="No matches"
            ref="countrySelect"
            remote
            placeholder="Please enter a country"
            :remote-method="remoteMethodCountries"
            :remove-tag="onCountriesDeleteTag"
            :loading="loadingCountries"
            @change="onCountrySelect"
        >
            <el-option
                v-for="country in countryOptions"
                :key="country.value"
                :label="country.label"
                :value="country.value"
            />
        </el-select>
        <el-select
            v-model="companyTypes"
            multiple
            placeholder="Select company type"
            ref="typeSelect"
            @change="onTypeSelect"
        >
            <el-option v-for="type in companyTypeOptions" :key="type.value" :label="type.label" :value="type.value" />
        </el-select>
        <div v-for="port in $store.getters['Companies/rows']" :key="uniqueKey(port)">
            {{ port.name }}
        </div>
    </main>
</template>

<script>
import CompanyClient from '~/Api/Clients/CompanyClient.js';
import CountryClient from '~/Api/Clients/CountryClient.js';
import ApiClient from '~/Api/Clients/BaseClient.js';
import PageTopbar from '~/components/App/PageTopbar.vue';
import eeIcon from '~/elements/eeIcon.vue';
import Pagination from '~/components/QueryBuilder/Pagination.vue';

import QueryBuilderMixin from '~/mixins/QueryBuilderMixin.js';
import QueryBuilderModule from '~/store/modules/QueryBuilder/index.js';
import { arrayDiff } from '~/utils/object.js';

import settings from './config.js';

export default {
    name: 'CompaniesPage',
    components: { eeIcon, PageTopbar, Pagination },
    mixins: [QueryBuilderMixin],
    data() {
        return {
            storePath: settings.storePath,
            accessToken: 'pk.eyJ1IjoiZWVzZWEiLCJhIjoiY2swbm5obWc3MDFkNjNsbnplMDA4amxwaiJ9.JhJwc3mu6M2uCQTLxvz-OQ',
            companyTypeOptions: [],
            companyTypes: [],
            countries: [],
            countryOptions: [],
            loadingCountries: false,
            mapStyle: 'mapbox://styles/mapbox/light-v10',
            ports: [],
        };
    },
    created() {
        this.mapbox = Mapbox;
        if (this.$store.state[this.storePath] === undefined) {
            this.$store.registerModule('Companies', QueryBuilderModule);
            this.$store.dispatch(`${this.storePath}/applySettings`, settings);
        }

        CompanyClient.getCompanyTypes()
            .then(response => {
                this.companyTypeOptions = response.data;
                // this.fetchCompanies();
            })
            .catch(error => {
                console.error(error);
            });
    },
    beforeDestroy() {
        this.$store.unregisterModule(this.settings.storeModulePath);
    },
    watch: {
        countries(newValue, oldValue) {
            const item = arrayDiff(newValue, oldValue);
            const action = newValue.length - oldValue.length > 0 ? 'newFilter' : 'removeFilter';
            this.$store.dispatch(`${settings.storePath}/${action}`, {
                column: 'country',
                value: item[0],
            });
        },
    },
    methods: {
        onMarkerClick(index, e) {
            this.$refs['portMarker' + index].togglePopup;
        },

        async remoteMethodCountries(value) {
            this.loadingCountries = true;
            try {
                const response = await CountryClient.query(value);
                this.countryOptions = await response.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.loadingCountries = false;
            }
        },

        // fetchCompanies() {
        //     const filters = [];
        //     if (this.countries.length) filters.push(`filter[country]=${this.countries.join(',')}`);
        //     if (this.companyTypes.length) filters.push(`filter[type]=${this.companyTypes.join(',')}`);

        //     ApiClient.get(`/api/companies?${filters.join('&')}`)
        //         .then(response => {
        //             this.ports = response.data.data;
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         });
        // },

        onCountrySelect(value) {
            this.$refs.countrySelect.blur();
            // this.fetchCompanies();
            // add filter
        },

        onCountriesDeleteTag(tag) {
            // console.log(this.countries);
        },

        onTypeSelect() {
            this.$refs.typeSelect.blur();
            // this.fetchCompanies();
            // add filter -> push router -> routerWatch -> routerPushed? -> fetchData
        },
    },
};
</script>
