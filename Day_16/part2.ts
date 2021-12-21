import GetInput from '../Utils/FileInput';
import { OperatorPacket, packetFactory, translate } from './Packets';

const lines = GetInput('./Day_16/inputs.txt');

let temp = packetFactory(translate(lines[0])) as OperatorPacket;

console.log(temp.evaluate());
