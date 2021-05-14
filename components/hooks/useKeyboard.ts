import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboard() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    function handleShow () {
      setIsVisible(true)
    }
    function handleHide () {
      setIsVisible(false)
    }
    Keyboard.addListener('keyboardDidHide', handleHide)
    Keyboard.addListener('keyboardDidShow', handleShow)
    return () => {
      Keyboard.removeListener('keyboardDidHide', handleHide);
      Keyboard.removeListener('keyboardDidShow', handleShow);
    }
  }, [])
  return {isVisible};
}
