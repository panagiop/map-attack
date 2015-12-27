(function() {
    'use strict';

    function Pagination() {
        // initial private properties and functions
        var resultsPerPage = 5,
            currentPage = 0,
            numOfPages = 1000, // TODO: fix this ugly hack
            _setResultsPerPage = function(resultsperpage) {
                resultsPerPage = resultsperpage;
            },
            setResultsPerPage = function(results) {
                _setResultsPerPage(results);
            },
            _setCurrentPage = function(currentpage) {
                currentPage = currentpage;
            },
            setCurrentPage = function(current) {
                _setCurrentPage(current);
            },
            getResultsPerPage = function() {
                return resultsPerPage;
            },
            prevPage = function() {
                if (currentPage > 0) {
                    currentPage--;
                }
            },
            nextPage = function() {
                if (currentPage < numOfPages) {
                    currentPage++;
                }
            },
            getCurrentPage = function() {
                return currentPage;
            }

        return {
            setResultsPerPage: setResultsPerPage,
            setCurrentPage: setCurrentPage,
            getResultsPerPage: getResultsPerPage,
            prevPage: prevPage,
            nextPage: nextPage,
            getCurrentPage: getCurrentPage
        }
    }

    angular.module('Pagination.service', [])
        .factory('Pagination', Pagination);
})();
