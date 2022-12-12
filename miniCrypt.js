import * as c from 'crypto';

class MiniCrypt {
  constructor(its = 1e5, keyL = 64, saltL = 16, digest = 'sha256') {
    this.its = its;
    this.keyL = keyL;
    this.saltL = saltL;
    this.digest = digest;
  }
    hash(pw) {
	const salt = c.randomBytes(this.saltL).toString('hex'), 
        hash = c.pbkdf2Sync(pw, salt, this.its, this.keyL, this.digest).toString('hex');
	return [salt, hash];
  };
    check(pw, salt, hash) {
    return c.timingSafeEqual(c.pbkdf2Sync(pw, salt, this.its, this.keyL, this.digest), Buffer.from(hash, 'hex'));
  };
}

export { MiniCrypt };
