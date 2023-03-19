export const returnMarkerStyle = (points) => {
    if (points >= 50) {
      return {
        width: 84,
        height: 84,
        size: 64,
        fontSize: 20,
      };
    }
  
    if (points >= 25) {
      return {
        width: 78,
        height: 78,
        size: 58,
        fontSize: 19,
      };
    }
  
    if (points >= 15) {
      return {
        width: 72,
        height: 72,
        size: 54,
        fontSize: 18,
      };
    }
  
    if (points >= 10) {
      return {
        width: 66,
        height: 66,
        size: 50,
        fontSize: 17,
      };
    }
  
    if (points >= 8) {
      return {
        width: 60,
        height: 60,
        size: 46,
        fontSize: 17,
      };
    }
  
    if (points >= 4) {
      return {
        width: 54,
        height: 54,
        size: 40,
        fontSize: 16,
      };
    }
  
    return {
      width: 48,
      height: 48,
      size: 36,
      fontSize: 15,
    };
  };
  