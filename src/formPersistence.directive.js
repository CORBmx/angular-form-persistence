angular
    .module('formPersistence')
    .directive('formPersistence', formPersistence);

const DEBOUND_DELAY = 400;

/**
 * formPersistence directive
 * @author Andrés Ávila <andres.avila@corb.mx>
 * @version 0.0.1
 * @since   0.0.1
 * @param   {object} $timeout               Timeout service
 * @param   {object} formPersistence        formPersistence service
 * @return  {object}                        Directive instance
 */
function formPersistence($timeout, formPersistence) {
    'ngInject';

    return {
        restrict: 'A',
        scope: {
            key: '@formPersistence',
            data: '=saveData',
            onSave: '&?beforeSave',
            onLoad: '&?beforeLoad'
        },
        link: function (scope) {
            let debound;

            scope.data = formPersistence.load(scope.key, scope.onLoad);

            scope.$watch(() => {
                return scope.data;
            }, handleModelChange, true);

            /**
             * Changes handler
             * @author Andrés Ávila <andres.avila@corb.mx>
             * @version 0.0.1
             * @since   0.0.1
             */
            function handleModelChange() {
                let data;
                let key;

                key = scope.key;

                if (angular.isObject()) {
                    // copy object
                    data = {...scope.data};
                }

                if (debound) {
                    $timeout.cancel(debound);
                }

                debound = $timeout(() => {
                    formPersistence.save(key, data, scope.onSave);
                }, DEBOUND_DELAY);
            }
        }
    }
};
