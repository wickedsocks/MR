export default function({ route, redirect }) {
  let path = route.path;
  let lastPathElementIndex = path.length - 1;
  if (path[lastPathElementIndex] === '/') {
    return redirect(path.slice(0, lastPathElementIndex));
  }
}
