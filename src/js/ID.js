function ID() {
    const salt = (parseInt(Math.random().toString().replace('.', '')) + parseInt(Date.now())).toString();
    const shuffledSalt = shuffle(salt.split()).join('');
    return Date.now().toString() + '_' + shuffledSalt.substring(0, 4);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }