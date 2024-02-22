const MODULE_WORKER_REGEX =
  /new\s+Worker\s*\(\s*new\s+URL\s*\(\s*["'](.*?)["']\s*,\s*import\.meta\.url\s*\)\s*,\s*\{\s*type\s*:\s*["']module["']\s*\}\s*\)/g;
const TEMPORARY_DYNAMIC_IMPORT_REGEX =
  /\/\*__TEMP_WORKER__\*\/__vitePreload\(\(\) => import\((['"])(.+?)\1\),.*?\)/g;

const hasNoPathPrefix = (path) => !/^[\./]|^file:|^https?:/.test(path);

export default function moduleWorkerChunkPlugin() {
  return {
    name: "module-worker-chunk-plugin",
    apply: "build",
    transform(code, _id) {
      if (!code.includes("new Worker")) {
        return null;
      }
      const transformedCode = code.replaceAll(
        MODULE_WORKER_REGEX,
        (_, workerPath) => {
          const resolvedPath = hasNoPathPrefix(workerPath)
            ? `./${workerPath}`
            : workerPath;
          return `/*__TEMP_WORKER__*/import('${resolvedPath}')`;
        },
      );

      return {
        code: transformedCode,
        map: null,
      };
    },
    renderChunk(code) {
      if (!code.includes("/*__TEMP_WORKER__*/")) {
        return null;
      }
      const transformedCode = code.replaceAll(
        TEMPORARY_DYNAMIC_IMPORT_REGEX,
        (_, _quote, importPath) => {
          return `new Worker(new URL('${importPath}', import.meta.url), { type: 'module' })`;
        },
      );

      return {
        code: transformedCode,
        map: null,
      };
    },
  };
}
