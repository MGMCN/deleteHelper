// ==UserScript==
// @name         deleteHelper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Helps you automatically fill in the repository information in the delete confirmation box of github and dockerhub.
// @author       https://github.com/MGMCN
// @match        https://github.com/*
// @match        https://hub.docker.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function () {

    document.addEventListener('click', function (event) {
        if (event.target.closest('#verification_field')) {
            let repositoryName = getGithubUsernameAndRepositoryName();

            let inputElement = document.getElementById('verification_field');

            inputElement.value = repositoryName;
        } else {
            let repositoryName = getDockerHubRepositoryName();

            let inputElement = document.getElementById('imageNameField');

            inputElement.value = repositoryName;
        }
    });

    function getGithubUsernameAndRepositoryName() {
        let url = window.location.href;
        let parts = url.split("/");

        if (parts.length >= 3) {
            let username = parts[parts.length - 3];
            let repository = parts[parts.length - 2];
            return username + '/' + repository + ' ';
        }

        return null;
    }

    function getDockerHubRepositoryName() {
        let url = window.location.href;
        let parts = url.split("/");

        if (parts.length >= 2) {
            const repository = parts[parts.length - 2];
            return repository + ' ';
        }

        return null;
    }

})();