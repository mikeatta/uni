# AI Course Project: Music Recommender
The logic behind the recommendation system is based on the [Spotify Recommender](https://github.com/ajhalthor/spotify-recommender) by Ajay Halthor. My job during the course was to gain an understanding of the recommendation algorithm and improve upon it by adding extra functionalities.

## Steps to run
1. Download the compressed `tar.gz` file corresponding to your region from [AudioSet](https://research.google.com/audioset/download.html) and extract it. Move or copy the files to the working directory of the recommender. The results are YouTube videos that have been encoded with the [MAX Audio Embedding Generator](https://github.com/IBM/MAX-Audio-Embedding-Generator).
2. Run the `audioset_processing` notebook. This action will:
    - Extract only the results related to music
    - Cut the samples to 10 seconds
    - Create a JSON file containing the music set
3. Run the `annoy_recommender` notebook.
To get recommendations based on different samples or to return a different amount of results, replace the arguments of the `get_nns_by_item()` in `nns_index = annoy_index.get_nns_by_item(100,10)` with your desired values.

## Embedding custom samples
To generate your own embeddings from `.wav` files:
1. Follow the steps in the [MAX Audio Embedding Generator](https://github.com/IBM/MAX-Audio-Embedding-Generator#run-locally) repository to build and deploy the Docker app on port 5000. [^1]
2. Once done, you'll be able to open the generator under `http://localhost:5000` and upload your own samples.

[^1]: Currently, there's an issue with a link in the repository's Dockerfile. To fix this, make sure to update the *model_bucket* argument to: `https://codait-cos-max.s3.us.cloud-object-storage.appdomain.cloud/max-audio-embedding-generator/1.0.0`.