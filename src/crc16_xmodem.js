import {Buffer} from 'buffer';
import createBuffer from './create_buffer';
import defineCrc from './define_crc';

const crc16_xmodem = defineCrc('xmodem', function (buf, previous) {
  if (!Buffer.isBuffer(buf)) buf = createBuffer(buf);

  let crc = typeof(previous) !== 'undefined' ? ~~previous : 0x0;

  for (let index = 0; index < buf.length; index++) {
    const byte = buf[index];
    let code = crc >>> 8 & 0xFF;

    code ^= byte & 0xFF;
    code ^= code >>> 4;
    crc = crc << 8 & 0xFFFF;
    crc ^= code;
    code = code << 5 & 0xFFFF;
    crc ^= code;
    code = code << 7 & 0xFFFF;
    crc ^= code;
  }

  return crc;
});

export default crc16_xmodem;
