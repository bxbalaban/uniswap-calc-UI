#!/usr/bin/env python3
# import mysql.connector
import math
# import flask
import json
from flask import request
from flask import Flask,render_template
app = Flask(__name__)

# # app = flask.Flask(__name__)


def get_liquidity_0(x, sa, sb):
    return x * sa * sb / (sb - sa)


def get_liquidity_1(y, sa, sb):
    return y / (sb - sa)


def get_liquidity(x, y, sp, sa, sb):
    if sp <= sa:
        liquidity = get_liquidity_0(x, sa, sb)
    elif sp < sb:
        liquidity0 = get_liquidity_0(x, sp, sb)
        liquidity1 = get_liquidity_1(y, sa, sp)
        liquidity = min(liquidity0, liquidity1)
    else:
        liquidity = get_liquidity_1(y, sa, sb)
    return liquidity


def calculate_x(L, sp, sa, sb):
    sp = max(
        min(sp, sb), sa
    )  # if the price is outside the range, use the range endpoints instead
    return L * (sb - sp) / (sp * sb)


def calculate_y(L, sp, sa, sb):
    sp = max(
        min(sp, sb), sa
    )  # if the price is outside the range, use the range endpoints instead
    return L * (sp - sa)


def calculate_a2(sp, sb, x, y):
    sa = y / (sb * x) + sp - y / (sp * x)
    return sa**2


def calculate_b2(sp, sa, x, y):
    P = sp**2
    return (sp * y / ((sa * sp - P) * x + y)) ** 2


def USDC_ETH_UPPER(usdc, eth, upperbound, currentprice):

    print(
        "What is my lower bound for {:.2f} ETH and {:.2f} USDC if upper range is {:.2f} and current ETH is ${:.2f}?".format(
            eth, usdc, upperbound, currentprice
        )
    )
    p = currentprice
    b = upperbound  ### Upper Bound
    x = eth
    y = usdc

    sp = p**0.5
    sb = b**0.5

    a = calculate_a2(sp, sb, x, y)
    print("Lower bound of the price ${:.2f}".format(a))


def ASSET_BALANCES_TRADEPRICE(usdc, eth, upperbound, lowerbound, tradeprice):
    #JSON object to return
    data = {}

    #print("What are asset balances at 2500 USDC per ETH?")
    p = tradeprice
    a = lowerbound
    b = upperbound
    x = eth
    y = usdc

    sp = p**0.5
    sa = a**0.5
    sb = b**0.5
    # calculate the initial liquidity
    L = get_liquidity(x, y, sp, sa, sb)

    datarange = []
    for num in range(0, 11):
        
        P1 = (upperbound - lowerbound) / 10 * num + lowerbound
        sp1 = P1**0.5
        x1 = calculate_x(L, sp1, sa, sb)
        y1 = calculate_y(L, sp1, sa, sb)
        rangedata = {"ethprice":P1,"eth":x1,"usdc":y1,"notionalvalue":P1 * x1 + y1}
        #print(
        #    "At ETH price {:.2f}, amount of ETH x={:.2f} amount of USDC y={:.2f}. In USDC terms: ${:.2f}".format(
        #        P1, x1, y1, P1 * x1 + y1
        #    )
        #)
        datarange.append(rangedata)
        #print(rangedata)


    # Y Value at the time of the trade price
    P1 = tradeprice
    sp1 = P1**0.5   
    x1 = calculate_x(L, sp1, sa, sb)
    y1 = calculate_y(L, sp1, sa, sb)
    
    #print(
    #    "Adjusted balances at the begining. ETH price {:.2f}, ETH x={:.2f} USDC y={:.2f}. Total Investment: ${:.2f}".format(
    #        P1, x1, y1, P1 * x1 + y1
    #    )
    #)

    # Connect to the database
    #mydb = mysql.connector.connect(
    #    host="torasandb.mysql.database.azure.com",
    #    user="foueralogin@torasandb",
    #    password="xxxxxxxxxxxx",
    #    database="binance",
    #)

    # The sql query to pull average TVL and avg fees for the last ten days
    #sql = "WITH CTE AS (SELECT * FROM poolvolumedata WHERE snapshotdate < DATE(NOW()) ORDER BY snapshotdate desc LIMIT 10) SELECT AVG(feesusd) AS feesusd, AVG(tvlusd) AS tvlusd FROM CTE;"

    # Connect to the database and get the row
    #mycursor = mydb.cursor()
    #mycursor.execute(sql)
    #myresult = mycursor.fetchone()

    # Set the fees and the tvl
    #feesusd = float(myresult[0])
    #tvlusd = float(myresult[1])

    # Assume that ETH is set by the user
    ethprice = tradeprice

    # Assume that TVL 70% is uniformly distributeed between -25% - 25%
    # Total number of buckets is 100 and represents $500 - $2500, 100 buckets represent 2000 ticks
    #bucketTVLinRange = tvlusd * 0.7 / 50
    #bucketTVLoutRange = tvlusd * 0.3 / 50
    #print("TVL locketd is ${:.2f}".format(tvlusd))
    #print("TVL locketd per bucket in range ${:.2f}".format(bucketTVLinRange))

    # Assume that Range is between $2000 - $215.73
    # 1800 = 2000 - 200  #Number of ticks
    investedbuckets = math.floor(b - a) / 2000 * 100
    investmentotal = usdc + eth * tradeprice
    investmentotalperbucket = investmentotal / investedbuckets

    # Fees per day, investment per bucket / tvl at that range * Fees per day
    #feescollected = investmentotalperbucket / bucketTVLinRange * feesusd

    # Display the result
    #print("The amount of fees collected: ${:.2f}".format(feescollected))
    #print(
    #    "Full range fees collected: ${:.2f}".format(investmentotal / tvlusd * feesusd)
    #)
    datarange = {"ranges": datarange,"begining": {"ethprice":P1,"eth":x1,"usdc":y1,"notionalvalue":P1 * x1 + y1},"tvl":150000000,"fees": 3000000}
    return datarange

@app.route("/calculate",methods=["GET"])
def calculate():
    ##for num in range(1,10):
    ##    USDC_ETH_UPPER(5000, 1, 1400+100*num, 1000)
    ##return "Distant Reading Arng of science fiction novels."
    
    #Set the parameters from url
    # args = request.args
    # usdc = float(args['usdc'])
    # eth = float(args['eth'])
    # upperbound = float(args['upperbound']) 
    # lowerbound = float(args['lowerbound']) 
    # tradeprice = float(args['tradeprice'])
    
    # datarange = ASSET_BALANCES_TRADEPRICE(usdc, eth, upperbound, lowerbound, tradeprice)

    datarange = ASSET_BALANCES_TRADEPRICE(6146, 2.897, 1239, 900, 1111.9)
    ##ASSET_BALANCES_TRADEPRICE(1828.42, 1, 2000, 215.73, 1000)
    return datarange

def members():
    return {"members":["Member1","Member2","Member3"]}
if __name__ == "__main__":
    app.run(debug=True)
#    main()
