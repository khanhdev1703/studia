const decodeFilename = (filename) => {
    return Buffer.from(filename, "latin1").toString(
        "utf8"
    );
};

export default decodeFilename