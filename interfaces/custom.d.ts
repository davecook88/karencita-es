declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: null;
        promise: null;
      };
    }
  }
}
