import { spawn } from 'child_process';
import open from 'open';

const server = spawn('npx', ['nodemon', 'index.js'], {
  stdio: 'inherit',
  shell: true
});

// Wait 1.5 seconds, then open the browser
setTimeout(() => {
  open('http://localhost:9000');
}, 1500);
