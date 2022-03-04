import { Vec3 } from "cc";
export function getVectorOnDirection(vector: Vec3, otherVector: Vec3) {
  if (otherVector.length() == 0) {
    return vector;
  }
  return otherVector
    .clone()
    .normalize()
    .multiplyScalar(vector.clone().dot(otherVector) / otherVector.length());
}
