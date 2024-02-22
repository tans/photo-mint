import React, { useState, useEffect } from "react";

import { ScrollArea } from "./components/ui/scroll-area";

import ParamsPanel from "./components/app/params-panel";
import TasksPanel from "./components/app/tasks-panel";

import { readFile, writeFile, stat } from "@tauri-apps/plugin-fs";
import { listen } from "@tauri-apps/api/event";
import { basename, extname } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/core";

import * as jpg from "https://unpkg.com/@jsquash/jpeg?module";
import * as png from "https://unpkg.com/@jsquash/png?module";
import * as oxipng from "https://unpkg.com/@jsquash/oxipng?module";
import * as webp from "https://unpkg.com/@jsquash/webp?module";

let compressors = {
  jpg: jpg,
  png: png,
  webp: webp,
};
// import _ from "lodash";
export default function Editor() {
  let [files, setFiles] = useState([]);
  let params = {
    format: "webp",
    crop: "mw1280",
    target: "replace",
    size: "kb300",
  };

  useEffect(() => {
    const unlisten = listen("tauri://file-drop", async function(event) {
      console.log(params);
      let newFiles = await Promise.all(
        event.payload.paths.map(async function(path) {
          // const options = {
          //   maxSizeMB: 1,
          //   maxWidthOrHeight: 1920,
          //   useWebWorker: true,
          // };

          let img = await readFile(path);

          let osize = (await stat(path)).size;
          let name = await basename(path);
          let ext = await extname(path);
          // let blob = new Blob([img]);

          let decoder = null;
          let encoder = null;
          let compressor = null;
          if (["jpg", "jpeg"].includes(ext.toLowerCase())) {
            compressor = "jpg";
          }
          if (ext.toLowerCase() == "png") {
            compressor = "png";
          }
          if (ext.toLowerCase() == "webp") {
            compressor = "webp";
          }

          if (!compressor) {
            return;
          }
          decoder = compressors[compressor].decode;

          if (params.format == "origin") {
            encoder = compressors[compressor].encode;
          } else {
            encoder = compressors[params.format].encode;
          }

          let ret = {
            name: name,
            osize: osize,
            src: convertFileSrc(path),
            hash:
              new Date().getTime() + "-" + Math.round(Math.random() * 10000),
            path: path,
          };

          try {
            let imgData = await decoder(img.buffer);
            let encodedBuffer = await encoder(imgData);
            // let encodedBuffer = await oxipng.optimise(imgData);
            let dest = [compressor, "origin"].includes(params.format)
              ? path
              : path.replace(new RegExp(ext + "$"), params.format);

            console.log(dest);
            if (
              (compressor == "png" && params.format == "origin") ||
              params.format == "png"
            ) {
              console.log("oxipng");
              encodedBuffer = await oxipng.optimise(encodedBuffer);
            }
            await writeFile(dest, new Uint8Array(encodedBuffer));
            let nsize = (await stat(dest)).size;
            ret.nsize = nsize;
            return ret;
          } catch (err) {
            console.error(err);
            return ret;
          }
        }),
      );
      files = newFiles.filter((i) => i);
      setFiles(files);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <div>
      <ParamsPanel
        params={params}
        onChange={(value) => {
          console.log(value);
        }}
      ></ParamsPanel>

      <ScrollArea
        style={{ height: "500px" }}
        className="mt-2 rounded bg-white bg-opacity-60 px-2"
      >
        {files.length > 0 && (
          <>
            <div>
              <TasksPanel files={files}></TasksPanel>
            </div>
            {/* <div className="p-2 text-center text-xs text-gray-500">到底了</div> */}
          </>
        )}

        {files.length == 0 && (
          <div className=" my-20 text-center text-xs text-gray-600">
            拖入图片文件开始处理
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
