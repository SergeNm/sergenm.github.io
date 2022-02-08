import sanitize from "mongo-sanitize";

const cleanBody = (req, res, next) => {
  try {
    req.body = sanitize(req.body);
    next();
  } catch (error) {
    console.log("clean-body-error", error);
    return res.status(500).json({
      error: true,
      message: "Could not sanitize body",
    });
  }
};

export default cleanBody;