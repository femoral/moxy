import {MockDto, PathDto, ProxyDto} from "../model/path.dto";
import {MockPath, Path, ProxyPath} from "@moxy/paths";

export function map(path: PathDto): Path {
  switch (path.type) {
    case "mock":
      return mapMock(path as MockDto);
    case "proxy":
      return mapProxy(path as ProxyDto);
  }
}

function mapMock(path: MockDto) {
  return new MockPath(
    path.id,
    path.collection,
    path.path,
    path.method,
    path.responseBody,
    path.contentType,
    path.encoded
  );
}

function mapProxy(path: ProxyDto) {
  return new ProxyPath(
    path.id,
    path.collection,
    path.path,
    path.method,
    path.target
  );
}

export function reverseMap(path: Path): PathDto {
  switch (path.constructor.name) {
    case ProxyPath.name:
      return reverseMapProxy(path as ProxyPath);
    case MockPath.name:
      return reverseMapMock(path as MockPath);
    default:
      throw new Error("invalid path type");
  }
}

function reverseMapProxy(path: ProxyPath): ProxyDto {
  return {
    id: path.id,
    type: "proxy",
    collection: path.collection,
    target: path.target,
    method: path.method,
    path: path.path,
  };
}

function reverseMapMock(path: MockPath): MockDto {
  return {
    collection: path.collection,
    contentType: path.contentType,
    encoded: path.encoded,
    id: path.id,
    method: path.method,
    path: path.path,
    responseBody: path.responseBody,
    type: "mock",
  };
}
