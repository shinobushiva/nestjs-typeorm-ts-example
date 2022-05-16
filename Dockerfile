FROM public.ecr.aws/lambda/nodejs:14

RUN npm install -g yarn
RUN npm install -g serverless

#  extra lines to install the agent here
# RUN curl -O https://lambda-insights-extension.s3-ap-northeast-1.amazonaws.com/amazon_linux/lambda-insights-extension.rpm && \
#     rpm -U lambda-insights-extension.rpm && \
#     rm -f lambda-insights-extension.rpm

COPY package.json yarn.lock ./
COPY dist ./

# build用なのでdevDepsも必要
RUN yarn install --silent --no-progress --frozen-lockfile

WORKDIR /var/task/
CMD [ "src/handler.handler" ]
