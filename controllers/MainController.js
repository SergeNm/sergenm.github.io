class MainController {
    home(req, res) {
        return res.send("You can find the documentation of this api here: <a href=\"https://sergenm-brand.herokuapp.com/docs/\"> here </a>");
    }
}
export default MainController;