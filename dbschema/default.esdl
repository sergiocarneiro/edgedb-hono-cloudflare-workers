module default {
  type Person {
    required name: str;
  }

  type Movie {
    title: str;
    multi actors: Person;
  }
};
