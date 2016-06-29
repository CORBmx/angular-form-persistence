import store from 'store';

angular
    .module('formPersistence')
    .provider('formPersistence', formPersistence)


function formPersistence() {
    this.prefix = 'fp';

    /**
     * Prefix setter
     * @author Andrés Ávila <andres.avila@corb.mx>
     * @version 0.0.1
     * @since   0.0.1
     * @param   {string} prefix  prefix attached to all the keys
     * @return  {object}         provider reference
     */
    this.setPrefix = (prefix) => {
        this.prefix = prefix;

        return this;
    };

    this.$get = () => {
        let self = this;

        return {
            save: saveData,
            load: loadData,
            clear: clearKey,
            clearAll: clearAll,
        };

        /**
         * Key prefixer
         * @author Andrés Ávila <andres.avila@corb.mx>
         * @version 0.0.1
         * @since   0.0.1
         * @param   {string} key  raw key
         * @return  {string}      prefixed key
         */
        function prefixKey(key) {
            return `${self.prefix}.${key}`;
        }

        /**
         * Save data manually in local storage
         * @author Andrés Ávila <andres.avila@corb.mx>
         * @version 0.0.1
         * @since   0.0.1
         * @param   {string}   key     Data key
         * @param   {object}   data    Data to be stored
         * @param   {function} onSave  Optional function to handle the data before is stored
         */
        function saveData(key, data, onSave) {
            let key_name = prefixKey(key);

            data = onSave(data) || data;

            if (Object.getOwnPropertyNames(data).length) {
                store.set(key_name, data);
            }
        }

        /**
         * Load data from local storage
         * @author Andrés Ávila <andres.avila@corb.mx>
         * @version 0.0.1
         * @since   0.0.1
         * @param   {string}   key     Data key
         * @param   {function} onLoad  Optional function to handle the data before is loaded
         * @return  Data stored or onLoad results
         */
        function loadData(key, onLoad) {
            let data;
            let key_name = prefixKey(key);

            data = store.get(key_name)

            return onLoad(data) || data;
        }

        /**
         * Remove data stored with the given key
         * @author Andrés Ávila <andres.avila@corb.mx>
         * @version 0.0.1
         * @since   0.0.1
         * @param   {string} key  Data key
         */
        function clearKey(key) {
            store.remove(prefixKey(key));
        }

        /**
         * Remove all stored data and keys
         * @author Andrés Ávila <andres.avila@corb.mx>
         * @version 0.0.1
         * @since   0.0.1
         */
        function clearAll() {
            store.clear();
        }
    };
}
