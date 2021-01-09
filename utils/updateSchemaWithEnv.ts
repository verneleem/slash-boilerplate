const fs = require('fs');
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) throw result.error;
if (!process.env.REACT_APP_SLASH_AUTH_HEADER)
  throw 'REACT_APP_SLASH_AUTH_HEADER not set';
if (!process.env.REACT_APP_SLASH_AUTH_NAMESPACE)
  throw 'REACT_APP_SLASH_AUTH_NAMESPACE not set';
if (!process.env.REACT_APP_AUTH0_CLIENT_ID)
  throw 'REACT_APP_AUTH0_CLIENT_ID not set';

const {
  REACT_APP_SLASH_AUTH_HEADER,
  REACT_APP_SLASH_AUTH_NAMESPACE,
  REACT_APP_AUTH0_CLIENT_ID,
} = process.env;

try {
  const data = fs.readFileSync('deploy/cert.pem', 'utf8');
  const lines = data.split(/\r?\n/);
  const SLASH_AUTH_VERIFICATION_KEY = lines.join('\\n');
  if (SLASH_AUTH_VERIFICATION_KEY === '') throw 'Empty deploy/cert.pem file';

  try {
    const data = fs.readFileSync('deploy/schema.graphql', 'utf8');
    const lines = data.split(/\r?\n/);

    // delete any existing Dgraph.Authorization line
    let i = lines.length;
    while (i--) {
      if (lines[i].startsWith('# Dgraph.Authorization')) {
        lines.splice(i, 1);
      }
    }

    // add a new Dgraph.Authorization line using cert.pem and .env variables
    lines.push(
      `# Dgraph.Authorization {"VerificationKey":"${SLASH_AUTH_VERIFICATION_KEY}","Header":"${REACT_APP_SLASH_AUTH_HEADER}","Namespace":"${REACT_APP_SLASH_AUTH_NAMESPACE}","Algo":"RS256","Audience":["${REACT_APP_AUTH0_CLIENT_ID}"]}`,
    );
    const content = lines.join('\n');

    try {
      fs.writeFileSync('deploy/schema.graphql', content);
    } finally {
    }
  } finally {
  }
} catch (err) {
  throw err;
} finally {
  console.log(
    'Schema File Updated Successfully using cert.pem and .env variables.',
  );
}
