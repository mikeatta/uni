import numpy as np
import pandas as pd

class popularity_recommender():
    def __init__(self):
        self.train_data = None
        self.user_id = None
        self.item_id = None
        self.populatity_recommendations = None

    def create(self, train_data, user_id, item_id):
        self.train_data = train_data
        self.user_id = user_id
        self.item_id = item_id

        # Count song playbacks
        train_data_grouped = train_data.groupby([self.item_id]).agg({self.user_id: 'count'}).reset_index()
        train_data_grouped.rename(columns = {'user_id': 'score'}, inplace=True)

        # Order results by highest play count
        train_data_sort = train_data_grouped.sort_values(['score', self.item_id], ascending = [0,1])
        train_data_sort['rank'] = train_data_sort['score'].rank(ascending=0, method='first').astype(int)

        self.populatity_recommendations = train_data_sort

    def recommend(self):
        recommendation = self.populatity_recommendations

        return recommendation