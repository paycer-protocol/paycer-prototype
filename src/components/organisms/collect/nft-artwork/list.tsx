import NftArtworkTile from "./tile";

const NftArtworkList = () => {
    return (
        <div className="row">
            <div className="col-xl-4"><NftArtworkTile></NftArtworkTile></div>
            <div className="col-xl-4"><NftArtworkTile></NftArtworkTile></div>
            <div className="col-xl-4"><NftArtworkTile></NftArtworkTile></div>
            <div className="col-xl-4"><NftArtworkTile></NftArtworkTile></div>
            <div className="col-xl-4"><NftArtworkTile></NftArtworkTile></div>
            <div className="col-xl-4"><NftArtworkTile></NftArtworkTile></div>
        </div>
    );
};

export default NftArtworkList;