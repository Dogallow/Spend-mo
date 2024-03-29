from flask.cli import AppGroup
from .users import seed_users, undo_users
from .wallet import seed_wallets, undo_wallets
from .likes import undo_likes, seed_likes
from .comments import unseed_comments, seed_comments
from .transactions import undo_transactions, seed_transactions
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_wallets()
        undo_transactions()
        undo_likes()
        unseed_comments()
    seed_users()
    seed_wallets()
    seed_transactions()
    seed_likes()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_wallets()
    undo_transactions()
    undo_likes()
    unseed_comments()
    # Add other undo functions here
