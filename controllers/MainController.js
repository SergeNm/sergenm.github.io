class MainController {
    home(req, res) {
        return res.send("<h2>You can find the documentation of this api <a href=\"https://sergenm-brand.herokuapp.com/docs/\"> here </a><h2>");
    }
}
export default MainController;

