class MainController {
    home(req, res) {
        return res.send("You can find the documentation of this api here: https://sergenm-brand.herokuapp.com/docs/");
    }
}
export default MainController;