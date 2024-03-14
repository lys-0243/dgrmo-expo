import { Dimensions, StyleSheet } from "react-native";
import colors from "./colors";
export const width = Dimensions.get("window").width;
export const heigth = Dimensions.get("window").height;

const styles = StyleSheet.create({
  btnPrimary: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: width - 60,
  },

  btnBlueLight: {
    height: 50,
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: width - 60,
  },
  btnBlue: {
    height: 50,
    backgroundColor: colors.blue,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: width - 60,
  },

  btnBlueShort: {
    height: 50,
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  btnRedShort: {
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderColor: colors.lightGray,
    backgroundColor: colors.lightGray40,
    borderWidth: 2,
    width: width - 60,
    borderRadius: 50,
    color: colors.lightGray,
    fontSize: 18,
    fontFamily: "Medium",
  },
  inputTitle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: colors.lightGray40,
    backgroundColor: colors.lightGray40,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.lightGray,
    fontSize: 14,
    fontFamily: "Bold",
    textAlign: "left",
    width: width - 100,
  },
  inputText: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightGray40,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.lightGray,
    fontSize: 24,
    fontFamily: "Regular",
    height: 250,
    textAlign: "left",
    marginTop: 10,
  },

  textBtn: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Medium",
  },

  dropDown: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderColor: colors.darkGray,
    borderWidth: 1,
    width: width - 40,
    borderRadius: 7,
    color: colors.darkGray,
    backgroundColor: colors.white,
  },

  errorMessageStyle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.secondary,
    textAlign: "left",
  },

  setShadowProp: {
    shadowColor: colors.lightGray,
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    elevation: 5,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.darkGray,
    opacity: 0.2,
    zIndex: 1,
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: 220,
    width: "100%",
    position: "absolute",
    top: 20 * 1.1,
    borderRadius: 20,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
