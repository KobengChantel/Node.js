const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('base64');
console.log(secret);


'fMjC5rJLBV99P1FNzzu2g4tHdqODOCPAwozrGLg72q6h4kvTPje2QnU78XKq0+wHgRBRj09Bpf7pg6JO3J7prg=='