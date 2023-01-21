const express = require("express");

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
