export { getJsonData }
function getJsonData(json) {

    return new Promise((resolve) => {
        fetch(json)
            .then(response => response.json())
            .then(data => resolve(data));
    });
}