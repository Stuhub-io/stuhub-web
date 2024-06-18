const int V = 20;
const int MINUS_ONE = -1;

int getIntVertex(char vertex)
{
    return vertex >= 'a' ? vertex - 'a' : vertex - 'A';
}

void copyBFValueToBFValuePrev(int BFValuePrev[V], int BFValue[V])
{
    for (int i = 0; i < V; i++)
    {
        BFValuePrev[i] = BFValue[i];
    }
}

int Plus(int a, int b)
{
    if (a == MINUS_ONE)
        return MINUS_ONE;
    if (b == MINUS_ONE)
        return MINUS_ONE;
    return a + b;
}

bool isSmaller(int a, int b)
{
    if (a == MINUS_ONE) // infinity
        return false;
    if (b == MINUS_ONE) // infinity
        return true;
    return a < b;
}

void BF(int G[V][V], int numOfVertices, char start_vertex, int BFValue[V], int BFPrev[V])
{
    int start_index = getIntVertex(start_vertex);
    BFValue[start_index] = 0; // curent vertex

    for (int src = 0; src < numOfVertices; src++)
    {
        for (int dest = 0; dest < numOfVertices; dest++)
        {
            if (G[src][dest] == MINUS_ONE)
            {
                continue;
            }
            {
                if (isSmaller(Plus(BFValue[src], G[src][dest]), BFValue[dest]))
                {
                    BFValue[dest] = Plus(BFValue[src], G[src][dest]);
                    BFPrev[dest] = src;
                }
            }
        }
    }
}

// const int V = 20;
// const int MINUS_ONE = -1;

// int getIntVertex(char vertex)
// {
//     return vertex >= 'a' ? vertex - 'a' : vertex - 'A';
// }

// void copyBFValueToBFValuePrev(int BFValuePrev[V], int BFValue[V])
// {
//     for (int i = 0; i < V; i++) {
//         BFValuePrev[i] = BFValue[i];
//     }
// }

// void BF(int G[V][V], int numOfVertices, char start_vertex, int BFValue[V], int BFPrev[V])
// {
//     int start_index = getIntVertex(start_vertex);
//     BFValue[start_index] = 0;
//     int BFValuePrev[V];
//     copyBFValueToBFValuePrev(BFValuePrev, BFValue);

//     for (int src = 0; src < numOfVertices; src++)
//     {
//         for (int dest = 0; dest < numOfVertices; dest++)
//         {
//             if (G[src][dest] != 0 && BFValuePrev[src] != MINUS_ONE)
//             {
//                 if (BFValuePrev[dest] == MINUS_ONE && BFPrev[dest] == MINUS_ONE)
//                 {
//                     BFValue[dest] = BFValuePrev[src] + G[src][dest];
//                     BFPrev[dest] = src;
//                 }
//                 else if (BFValuePrev[src] + G[src][dest] < BFValuePrev[dest])
//                 {
//                     if (BFValuePrev[src] + G[src][dest] < BFValue[dest])
//                     {
//                         BFValue[dest] = BFValuePrev[src] + G[src][dest];
//                         BFPrev[dest] = src;
//                     }
//                 }
//             }
//         }
//     }
// }